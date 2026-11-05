import { test, expect } from '@playwright/test';

test('5x Value Creation Engine, Stream Case Studies & Business Gaming E2E flow', async ({ page }) => {
  await page.setViewportSize({ width: 1360, height: 920 });
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: /5x Value Creation Engine, Stream Case Studies & Hafıza Atlası/i,
    })
  ).toBeVisible();

  // 1. 5x Stream Case Studies & Lever Simulator
  await expect(page.getByTestId('streams-tab')).toBeVisible();
  await page.getByTestId('preset-5x-btn').click();
  await expect(page.getByTestId('active-stream-multiplier')).toContainText('5');
  await page.screenshot({ path: 'screenshots/01-5x-stream-case-study.png', fullPage: true });

  // Switch to Stream 2 (Mobility) & Stream 5 (Projectivity)
  await page.getByTestId('select-stream-mobility').click();
  await expect(page.getByTestId('active-stream-title')).toContainText('Araç Teknik Rapor Denetimi');
  await page.screenshot({ path: 'screenshots/02-mobility-case-study.png', fullPage: true });

  // 2. Interactive Business Gaming (Boardroom Wargame, Stress Sandbox, Comm Duel)
  await page.getByTestId('nav-wargame').click();
  await expect(page.getByTestId('wargame-tab')).toBeVisible();
  await page.getByTestId('wargame-opt-wg-h1-opt3').click();
  await expect(page.getByTestId('wargame-debrief')).toContainText('5x Stratejik Kaldıraç');
  await page.screenshot({ path: 'screenshots/03-interactive-wargame.png', fullPage: true });

  await page.getByTestId('mode-stress-btn').click();
  await page.getByTestId('apply-optimal-stress-btn').click();
  await expect(page.getByTestId('stress-resilience-score')).toContainText('100 / 100');
  await page.screenshot({ path: 'screenshots/04-stress-sandbox.png', fullPage: true });

  await page.getByTestId('mode-duel-btn').click();
  await expect(page.getByTestId('duel-score')).toContainText('100 / 100');
  await page.screenshot({ path: 'screenshots/05-communication-duel.png', fullPage: true });

  // 3. 2021-2026 Capsule & Memory Timeline
  await page.getByTestId('nav-capsule').click();
  await expect(
    page.getByText(/Kasım 2021 · Güneydoğu Asya & Dijital Kurulum/i)
  ).toBeVisible();
});
