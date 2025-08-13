import json
import os
import sqlite3
import uuid
from datetime import datetime

def handler(event, context):
    """
    Netlify Function handler for newsletter subscription
    """
    try:
        # CORS headers
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        }
        
        # Handle preflight OPTIONS request
        if event['httpMethod'] == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': headers,
                'body': ''
            }
        
        # Handle POST request for subscription
        if event['httpMethod'] == 'POST':
            return handle_subscription(event, headers)
        
        # Handle GET request for confirmation or stats
        if event['httpMethod'] == 'GET':
            query_params = event.get('queryStringParameters', {}) or {}
            action = query_params.get('action', '')
            
            if action == 'confirm':
                return handle_confirmation(event, headers)
            elif action == 'stats':
                return handle_stats(headers)
        
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': f'Internal server error: {str(e)}'})
        }

def handle_subscription(event, headers):
    """Handle newsletter subscription"""
    try:
        # Parse request body
        body = json.loads(event['body'])
        email = body.get('email', '').strip().lower()
        name = body.get('name', '').strip()
        
        # Validate email
        if not email or '@' not in email:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Valid email is required'})
            }
        
        # Initialize database
        init_database()
        
        # Check if email already exists
        conn = sqlite3.connect('/tmp/newsletter.db')
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, status FROM subscribers WHERE email = ?', (email,))
        existing = cursor.fetchone()
        
        if existing:
            if existing[1] == 'confirmed':
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'message': 'You are already subscribed to our newsletter!',
                        'email_sent': False
                    })
                }
        
        # Generate confirmation token
        token = str(uuid.uuid4())
        
        # Insert or update subscriber
        if existing:
            cursor.execute('''
                UPDATE subscribers 
                SET name = ?, token = ?, created_at = ?, status = 'pending'
                WHERE email = ?
            ''', (name, token, datetime.now().isoformat(), email))
        else:
            cursor.execute('''
                INSERT INTO subscribers (id, email, name, token, status, created_at)
                VALUES (?, ?, ?, ?, 'pending', ?)
            ''', (str(uuid.uuid4()), email, name, token, datetime.now().isoformat()))
        
        conn.commit()
        conn.close()
        
        # Send confirmation email (mock for now since we need SendGrid API key)
        email_sent = send_confirmation_email(email, name, token)
        
        return {
            'statusCode': 201,
            'headers': headers,
            'body': json.dumps({
                'message': 'Subscription successful! Please check your email to confirm.',
                'email_sent': email_sent,
                'subscriber_id': token
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': f'Subscription failed: {str(e)}'})
        }

def handle_confirmation(event, headers):
    """Handle email confirmation"""
    try:
        query_params = event.get('queryStringParameters', {}) or {}
        token = query_params.get('token', '')
        
        if not token:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Confirmation token is required'})
            }
        
        # Initialize database
        init_database()
        
        # Find subscriber by token
        conn = sqlite3.connect('/tmp/newsletter.db')
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, email, name FROM subscribers WHERE token = ? AND status = "pending"', (token,))
        subscriber = cursor.fetchone()
        
        if not subscriber:
            conn.close()
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Invalid or expired confirmation token'})
            }
        
        # Confirm subscription
        cursor.execute('''
            UPDATE subscribers 
            SET status = 'confirmed', confirmed_at = ?
            WHERE token = ?
        ''', (datetime.now().isoformat(), token))
        
        conn.commit()
        conn.close()
        
        # Send welcome email
        send_welcome_email(subscriber[1], subscriber[2])
        
        # Return HTML confirmation page
        html_response = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Subscription Confirmed - Tech Made Easy</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body {{ font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }}
                .container {{ max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
                h1 {{ color: #2d3748; margin-bottom: 20px; }}
                p {{ color: #4a5568; line-height: 1.6; }}
                .success {{ color: #38a169; font-weight: bold; }}
                .button {{ display: inline-block; background: #4299e1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🎉 Subscription Confirmed!</h1>
                <p class="success">Thank you for confirming your subscription to Tech Made Easy newsletter!</p>
                <p>You'll receive weekly insights on renewable energy, AI, and emerging technologies directly to your inbox.</p>
                <p>Welcome to our community of 5,000+ professionals!</p>
                <a href="https://techmadeeasy.info" class="button">Visit Our Website</a>
            </div>
        </body>
        </html>
        """
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/html'
            },
            'body': html_response
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': f'Confirmation failed: {str(e)}'})
        }

def handle_stats(headers):
    """Handle stats request"""
    try:
        # Initialize database
        init_database()
        
        conn = sqlite3.connect('/tmp/newsletter.db')
        cursor = conn.cursor()
        
        # Get statistics
        cursor.execute('SELECT COUNT(*) FROM subscribers WHERE status = "confirmed"')
        confirmed_count = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM subscribers WHERE status = "pending"')
        pending_count = cursor.fetchone()[0]
        
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'confirmed_subscribers': confirmed_count,
                'pending_confirmations': pending_count,
                'total_subscribers': confirmed_count + pending_count
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': f'Stats failed: {str(e)}'})
        }

def init_database():
    """Initialize SQLite database"""
    conn = sqlite3.connect('/tmp/newsletter.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS subscribers (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            name TEXT,
            token TEXT,
            status TEXT DEFAULT 'pending',
            created_at TEXT,
            confirmed_at TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

def send_confirmation_email(email, name, token):
    """Send confirmation email using SendGrid"""
    try:
        # Get SendGrid API key from environment
        api_key = os.environ.get('SENDGRID_API_KEY')
        if not api_key:
            print("SendGrid API key not found in environment variables")
            return False
        
        # Import SendGrid here to avoid import errors if not available
        import sendgrid
        from sendgrid.helpers.mail import Mail
        
        sg = sendgrid.SendGridAPIClient(api_key=api_key)
        
        # Confirmation URL
        confirmation_url = f"https://techmadeeasy.info/.netlify/functions/newsletter?action=confirm&token={token}"
        
        # Email content
        subject = "Confirm Your Newsletter Subscription - Tech Made Easy"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Confirm Your Subscription</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Tech Made Easy</h1>
                <p style="color: #f0f0f0; margin: 10px 0 0 0;">Making Technology Accessible to Everyone</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px;">
                <h2 style="color: #2d3748; margin-top: 0;">Confirm Your Newsletter Subscription</h2>
                
                <p>Hi {name or 'there'},</p>
                
                <p>Thank you for subscribing to the Tech Made Easy newsletter! To complete your subscription and start receiving our weekly insights, please confirm your email address by clicking the button below:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{confirmation_url}" style="background: #4299e1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Confirm Subscription</a>
                </div>
                
                <p><strong>What you'll get every week:</strong></p>
                <ul style="color: #4a5568;">
                    <li>Latest renewable energy developments and project insights</li>
                    <li>AI applications and technology trends analysis</li>
                    <li>Exclusive guides and templates for professionals</li>
                    <li>Industry networking opportunities and events</li>
                </ul>
                
                <p style="color: #718096; font-size: 14px; margin-top: 30px;">If you didn't subscribe to this newsletter, you can safely ignore this email. The subscription will not be activated without confirmation.</p>
                
                <p style="color: #718096; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="{confirmation_url}" style="color: #4299e1;">{confirmation_url}</a></p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #718096; font-size: 12px;">
                <p>© 2025 Tech Made Easy. All rights reserved.</p>
                <p>Making technology accessible to everyone through insightful content and education.</p>
            </div>
        </body>
        </html>
        """
        
        message = Mail(
            from_email='re.hoangvietduc@gmail.com',
            to_emails=email,
            subject=subject,
            html_content=html_content
        )
        
        response = sg.send(message)
        return response.status_code == 202
        
    except Exception as e:
        print(f"Failed to send confirmation email: {str(e)}")
        return False

def send_welcome_email(email, name):
    """Send welcome email after confirmation"""
    try:
        # Get SendGrid API key from environment
        api_key = os.environ.get('SENDGRID_API_KEY')
        if not api_key:
            print("SendGrid API key not found in environment variables")
            return False
        
        # Import SendGrid here to avoid import errors if not available
        import sendgrid
        from sendgrid.helpers.mail import Mail
        
        sg = sendgrid.SendGridAPIClient(api_key=api_key)
        
        # Email content
        subject = "Welcome to Tech Made Easy Newsletter! 🎉"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Welcome to Tech Made Easy</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome to Tech Made Easy!</h1>
                <p style="color: #f0f0f0; margin: 10px 0 0 0;">You're now part of our community of 5,000+ professionals</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px;">
                <h2 style="color: #2d3748; margin-top: 0;">Thank you for joining us, {name or 'there'}!</h2>
                
                <p>Your subscription is now confirmed, and you'll start receiving our weekly newsletter with the latest insights on renewable energy, AI, and emerging technologies.</p>
                
                <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #2d3748; margin-top: 0;">🎁 Free Welcome Gift</h3>
                    <p>As a welcome gift, download our comprehensive <strong>Renewable Energy Project Management Checklist</strong> - a 150+ item guide used by project managers worldwide.</p>
                    <div style="text-align: center; margin: 15px 0;">
                        <a href="https://techmadeeasy.info" style="background: #38a169; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Download Free Checklist</a>
                    </div>
                </div>
                
                <h3 style="color: #2d3748;">What to expect:</h3>
                <ul style="color: #4a5568;">
                    <li><strong>Weekly Insights:</strong> Latest renewable energy developments and project insights</li>
                    <li><strong>AI Analysis:</strong> Technology trends and practical applications</li>
                    <li><strong>Exclusive Content:</strong> Guides and templates for professionals</li>
                    <li><strong>Networking:</strong> Industry opportunities and events</li>
                </ul>
                
                <p>Our next newsletter will arrive in your inbox this week. In the meantime, feel free to explore our blog for the latest articles and insights.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://techmadeeasy.info" style="background: #4299e1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Explore Our Blog</a>
                </div>
                
                <p style="color: #718096; font-size: 14px; margin-top: 30px;">You can unsubscribe at any time by clicking the unsubscribe link in any of our emails. We respect your privacy and will never share your information.</p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #718096; font-size: 12px;">
                <p>© 2025 Tech Made Easy. All rights reserved.</p>
                <p>Making technology accessible to everyone through insightful content and education.</p>
            </div>
        </body>
        </html>
        """
        
        message = Mail(
            from_email='re.hoangvietduc@gmail.com',
            to_emails=email,
            subject=subject,
            html_content=html_content
        )
        
        response = sg.send(message)
        return response.status_code == 202
        
    except Exception as e:
        print(f"Failed to send welcome email: {str(e)}")
        return False
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            name TEXT,
            confirmation_token TEXT UNIQUE,
            confirmed BOOLEAN DEFAULT FALSE,
            created_at TEXT,
            confirmed_at TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

def send_confirmation_email(email, name, token, base_url):
    """Send confirmation email using SendGrid"""
    try:
        if not SENDGRID_API_KEY:
            print("SendGrid API key not found in environment variables")
            return False
            
        sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
        
        from_email = Email(FROM_EMAIL, FROM_NAME)
        to_email = To(email)
        subject = "Confirm Your Newsletter Subscription"
        
        confirm_url = f"{base_url}/.netlify/functions/newsletter?action=confirm&token={token}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirm Your Subscription</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Tech Made Easy</h1>
                <p style="color: #f0f0f0; margin: 10px 0 0 0;">Making Technology Accessible to Everyone</p>
            </div>
            
            <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-top: 0;">Confirm Your Newsletter Subscription</h2>
                
                <p>Hi {name or 'there'},</p>
                
                <p>Thank you for subscribing to the Tech Made Easy newsletter! To complete your subscription and start receiving our weekly insights on renewable energy, AI, and emerging technologies, please confirm your email address.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{confirm_url}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Confirm Subscription</a>
                </div>
                
                <p>What you'll get every week:</p>
                <ul style="color: #666;">
                    <li>Latest renewable energy developments and project insights</li>
                    <li>AI applications and technology trends analysis</li>
                    <li>Exclusive guides and templates for professionals</li>
                    <li>Industry networking opportunities and events</li>
                </ul>
                
                <p style="color: #888; font-size: 14px; margin-top: 30px;">If you didn't subscribe to this newsletter, you can safely ignore this email.</p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <div style="text-align: center; color: #888; font-size: 14px;">
                    <p>Tech Made Easy<br>
                    Making Technology Accessible to Everyone</p>
                    <p>© 2025 Tech Made Easy. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        mail = Mail(from_email, to_email, subject, html_content=Content("text/html", html_content))
        response = sg.send(mail)
        
        return response.status_code == 202
        
    except Exception as e:
        print(f"Email sending failed: {str(e)}")
        return False

def send_welcome_email(email, name):
    """Send welcome email using SendGrid"""
    try:
        if not SENDGRID_API_KEY:
            return False
            
        sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
        
        from_email = Email(FROM_EMAIL, FROM_NAME)
        to_email = To(email)
        subject = "Welcome to Tech Made Easy Newsletter!"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Tech Made Easy</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Tech Made Easy!</h1>
                <p style="color: #f0f0f0; margin: 10px 0 0 0;">You're now part of our community</p>
            </div>
            
            <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-top: 0;">Thank you for joining us!</h2>
                
                <p>Hi {name or 'there'},</p>
                
                <p>Welcome to the Tech Made Easy newsletter! You've successfully joined 5,000+ professionals who receive weekly insights on renewable energy, AI, and emerging technologies.</p>
                
                <h3 style="color: #667eea;">What to expect:</h3>
                <ul style="color: #666;">
                    <li><strong>Weekly Newsletter:</strong> Every Tuesday, you'll receive curated insights and analysis</li>
                    <li><strong>Exclusive Content:</strong> Early access to guides, templates, and industry reports</li>
                    <li><strong>Expert Analysis:</strong> Deep dives into renewable energy projects and AI applications</li>
                    <li><strong>Networking:</strong> Opportunities to connect with industry professionals</li>
                </ul>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 30px 0;">
                    <h4 style="color: #333; margin-top: 0;">🎁 Free Resource</h4>
                    <p style="margin-bottom: 15px;">As a welcome gift, download our comprehensive Renewable Energy Project Management Checklist - used by project managers worldwide!</p>
                    <a href="https://techmadeeasy.info" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px; font-weight: bold;">Download Free Checklist</a>
                </div>
                
                <p>Your first newsletter will arrive next Tuesday. In the meantime, feel free to explore our blog for the latest articles and insights.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://techmadeeasy.info/blog" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Explore Our Blog</a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <div style="text-align: center; color: #888; font-size: 14px;">
                    <p>Tech Made Easy<br>
                    Making Technology Accessible to Everyone</p>
                    <p>© 2025 Tech Made Easy. All rights reserved.</p>
                    <p><a href="#" style="color: #888;">Unsubscribe</a> | <a href="#" style="color: #888;">Update Preferences</a></p>
                </div>
            </div>
        </body>
        </html>
        """
        
        mail = Mail(from_email, to_email, subject, html_content=Content("text/html", html_content))
        response = sg.send(mail)
        
        return response.status_code == 202
        
    except Exception as e:
        print(f"Welcome email sending failed: {str(e)}")
        return False

def handler(event, context):
    """Netlify Function handler"""
    
    # Handle CORS
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
    
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        # Initialize database
        init_database()
        
        # Get query parameters and body
        query_params = event.get('queryStringParameters') or {}
        action = query_params.get('action', 'subscribe')
        
        # Get base URL for confirmation links
        base_url = f"https://{event['headers'].get('host', 'localhost')}"
        
        if action == 'subscribe' and event['httpMethod'] == 'POST':
            # Handle subscription
            body = json.loads(event['body'])
            email = body.get('email', '').strip().lower()
            name = body.get('name', '').strip()
            
            if not email:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Email is required'})
                }
            
            # Check if email already exists
            conn = sqlite3.connect('/tmp/newsletter.db')
            cursor = conn.cursor()
            
            cursor.execute('SELECT id, confirmed FROM subscribers WHERE email = ?', (email,))
            existing = cursor.fetchone()
            
            if existing:
                if existing[1]:  # Already confirmed
                    conn.close()
                    return {
                        'statusCode': 200,
                        'headers': headers,
                        'body': json.dumps({
                            'message': 'You are already subscribed to our newsletter!',
                            'already_subscribed': True
                        })
                    }
                else:  # Exists but not confirmed, resend confirmation
                    subscriber_id = existing[0]
            else:
                # Create new subscriber
                subscriber_id = str(uuid.uuid4())
                confirmation_token = str(uuid.uuid4())
                
                cursor.execute('''
                    INSERT INTO subscribers (id, email, name, confirmation_token, confirmed, created_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (subscriber_id, email, name, confirmation_token, False, datetime.now().isoformat()))
                
                conn.commit()
            
            # Get subscriber data for email
            cursor.execute('SELECT confirmation_token FROM subscribers WHERE id = ?', (subscriber_id,))
            token = cursor.fetchone()[0]
            conn.close()
            
            # Send confirmation email
            email_sent = send_confirmation_email(email, name, token, base_url)
            
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps({
                    'message': 'Subscription successful! Please check your email to confirm.',
                    'email_sent': email_sent,
                    'subscriber_id': subscriber_id
                })
            }
            
        elif action == 'confirm' and event['httpMethod'] == 'GET':
            # Handle email confirmation
            token = query_params.get('token')
            
            if not token:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Confirmation token is required'})
                }
            
            conn = sqlite3.connect('/tmp/newsletter.db')
            cursor = conn.cursor()
            
            # Find subscriber by token
            cursor.execute('SELECT id, email, name, confirmed FROM subscribers WHERE confirmation_token = ?', (token,))
            subscriber = cursor.fetchone()
            
            if not subscriber:
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'error': 'Invalid confirmation token'})
                }
            
            if subscriber[3]:  # Already confirmed
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'message': 'Email already confirmed. Welcome to our newsletter!'})
                }
            
            # Confirm subscription
            cursor.execute('UPDATE subscribers SET confirmed = ?, confirmed_at = ? WHERE id = ?', 
                          (True, datetime.now().isoformat(), subscriber[0]))
            conn.commit()
            conn.close()
            
            # Send welcome email
            send_welcome_email(subscriber[1], subscriber[2])
            
            # Return HTML response for confirmation page
            html_response = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Subscription Confirmed</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {{ font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; margin: 0; }}
                    .container {{ background: white; padding: 40px; border-radius: 10px; max-width: 500px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }}
                    h1 {{ color: #333; margin-bottom: 20px; }}
                    p {{ color: #666; line-height: 1.6; }}
                    .success {{ color: #28a745; font-size: 48px; margin-bottom: 20px; }}
                    .btn {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 20px; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="success">✅</div>
                    <h1>Subscription Confirmed!</h1>
                    <p>Thank you for confirming your email address. You're now subscribed to the Tech Made Easy newsletter!</p>
                    <p>You'll receive your first newsletter next Tuesday with the latest insights on renewable energy, AI, and emerging technologies.</p>
                    <a href="https://techmadeeasy.info" class="btn">Visit Our Website</a>
                </div>
            </body>
            </html>
            """
            
            return {
                'statusCode': 200,
                'headers': {
                    **headers,
                    'Content-Type': 'text/html'
                },
                'body': html_response
            }
            
        elif action == 'stats' and event['httpMethod'] == 'GET':
            # Handle statistics
            conn = sqlite3.connect('/tmp/newsletter.db')
            cursor = conn.cursor()
            
            cursor.execute('SELECT COUNT(*) FROM subscribers WHERE confirmed = ?', (True,))
            confirmed_count = cursor.fetchone()[0]
            
            cursor.execute('SELECT COUNT(*) FROM subscribers WHERE confirmed = ?', (False,))
            pending_count = cursor.fetchone()[0]
            
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'confirmed_subscribers': confirmed_count,
                    'pending_confirmations': pending_count,
                    'total_subscribers': confirmed_count + pending_count
                })
            }
            
        else:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Not found'})
            }
            
    except Exception as e:
        print(f"Function error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'An error occurred while processing your subscription'})
        }

