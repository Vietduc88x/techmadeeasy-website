import React from 'react';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppShell } from './AppShell';

export async function render(url) {
  const helmetContext = {};
  const app = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </HelmetProvider>
  );
  const html = await new Promise((resolve, reject) => {
    let markup = '';
    const destination = new PassThrough();
    destination.setEncoding('utf8');
    destination.on('data', (chunk) => { markup += chunk; });
    destination.on('end', () => resolve(markup));
    destination.on('error', reject);

    const { pipe } = renderToPipeableStream(app, {
      onAllReady() { pipe(destination); },
      onShellError: reject,
      onError: reject,
    });
  });
  return { html, helmet: helmetContext.helmet };
}
