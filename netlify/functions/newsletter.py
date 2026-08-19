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
                <h1>ðŸŽ‰ Subscription Confirmed!</h1>
                <p class="success">Thank you for confirming your subscription to Tech Made Easy newsletter!</p>
                <p>You'll receive the next energy-delivery playbook when it is ready.</p>
                <p>Field notes on preconstruction, packages, constructability, cost, and schedule.</p>
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
                <p style="color: #f0f0f0; margin: 10px 0 0 0;">Field notes from an energy PM</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px;">
                <h2 style="color: #2d3748; margin-top: 0;">Confirm Your Newsletter Subscription</h2>
                
                <p>Hi {name or 'there'},</p>
                
                <p>Thank you for subscribing to Tech Made Easy. To receive the next project-delivery playbook, please confirm your email address.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{confirmation_url}" style="background: #4299e1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Confirm Subscription</a>
                </div>
                
                <p><strong>What you'll get when I publish:</strong></p>
                <ul style="color: #4a5568;">
                    <li>Preconstruction decisions and project setup</li>
                    <li>Contracts, packages, and interface ownership</li>
                    <li>Cost and schedule assumptions that have to work</li>
                    <li>Constructability lessons from energy delivery</li>
                </ul>
                
                <p style="color: #718096; font-size: 14px; margin-top: 30px;">If you didn't subscribe to this newsletter, you can safely ignore this email. The subscription will not be activated without confirmation.</p>
                
                <p style="color: #718096; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="{confirmation_url}" style="color: #4299e1;">{confirmation_url}</a></p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #718096; font-size: 12px;">
                <p>Â© 2025 Tech Made Easy. All rights reserved.</p>
                <p>Field notes on preconstruction, packages, and delivery.</p>
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
        subject = "Welcome to Tech Made Easy Newsletter! ðŸŽ‰"
        
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
                <h1 style="color: white; margin: 0; font-size: 28px;">ðŸŽ‰ Welcome to Tech Made Easy!</h1>
                <p style="color: #f0f0f0; margin: 10px 0 0 0;">You're on the list for the next playbook</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px;">
                <h2 style="color: #2d3748; margin-top: 0;">Thank you for joining us, {name or 'there'}!</h2>
                
                <p>Your subscription is confirmed. I'll send the next energy-delivery playbook when it is ready.</p>
                
                <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #2d3748; margin-top: 0;">Start with the playbooks</h3>
                    <p>Browse the existing field notes on preconstruction, packages, constructability, cost, and schedule.</p>
                    <div style="text-align: center; margin: 15px 0;">
                        <a href="https://techmadeeasy.info/blog" style="background: #38a169; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Read the Playbooks</a>
                    </div>
                </div>
                
                <h3 style="color: #2d3748;">What to expect:</h3>
                <ul style="color: #4a5568;">
                    <li><strong>Preconstruction:</strong> Decisions and project setup before execution</li>
                    <li><strong>Packages:</strong> Contracts, interfaces, and responsibility</li>
                    <li><strong>Controls:</strong> Cost and schedule assumptions that have to work</li>
                    <li><strong>Delivery:</strong> Constructability lessons from the field</li>
                </ul>
                
                <p>I publish when there is a field note worth sending. In the meantime, explore the existing playbooks.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://techmadeeasy.info" style="background: #4299e1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Explore Our Blog</a>
                </div>
                
                <p style="color: #718096; font-size: 14px; margin-top: 30px;">You can unsubscribe at any time by clicking the unsubscribe link in any of our emails. We respect your privacy and will never share your information.</p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #718096; font-size: 12px;">
                <p>Â© 2025 Tech Made Easy. All rights reserved.</p>
                <p>Field notes on preconstruction, packages, and delivery.</p>
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
