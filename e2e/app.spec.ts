import { test, expect } from '@playwright/test';

test('Zaman Kapsülü & Hafıza Atlası E2E flow and screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /5 Yıl Önce Bugün & Kişisel Hafıza Atlası/i })
  ).toBeVisible();

  await page.screenshot({ path: 'screenshots/01-capsule-comparison.png', fullPage: true });

  // Navigate to Timeline tab and filter
  await page.getByTestId('nav-timeline').click();
  await expect(page.getByTestId('timeline-tab')).toBeVisible();
  await page.getByTestId('memory-search-input').fill('GMT+7');
  await expect(page.getByTestId('memory-results-count')).toContainText('4');
  await page.screenshot({ path: 'screenshots/02-timeline-filtered.png', fullPage: true });

  // Navigate to Analytics tab
  await page.getByTestId('nav-analytics').click();
  await expect(page.getByTestId('analytics-tab')).toBeVisible();
  await page.screenshot({ path: 'screenshots/03-analytics-insights.png', fullPage: true });

  // Navigate to Memory Gym tab and match a pair
  await page.getByTestId('nav-gym').click();
  await expect(page.getByTestId('gym-tab')).toBeVisible();
  await page.getByTestId('deck-card-pair-1-prompt').click();
  await page.getByTestId('deck-card-pair-1-match').click();
  await expect(page.getByTestId('game-matched')).toContainText('1 / 6');
  await page.screenshot({ path: 'screenshots/04-memory-gym.png', fullPage: true });
});
