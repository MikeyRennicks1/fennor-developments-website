import {expect,test} from '@playwright/test';

test('desktop headings open concise service dropdowns with keyboard support',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/electrical/domestic');
  const primary=page.getByRole('navigation',{name:'Main navigation'});
  const electrical=primary.getByRole('button',{name:'Electrical',exact:true});
  await electrical.click();
  const submenu=page.getByRole('navigation',{name:'Electrical pages'});
  await expect(submenu).toBeVisible();
  await expect(submenu.getByRole('link')).toHaveCount(3);
  await expect(submenu.getByRole('link',{name:/Domestic electrical/})).toHaveAttribute('href','/electrical/domestic');
  await expect(submenu.getByRole('link',{name:/Commercial electrical/})).toHaveAttribute('href','/electrical/commercial');
  await expect(submenu.getByRole('link',{name:/Industrial electrical maintenance/})).toHaveAttribute('href','/electrical/industrial-maintenance');
  await page.keyboard.press('Escape');
  await expect(submenu).toBeHidden();
  await expect(electrical).toBeFocused();
  await primary.getByRole('button',{name:'Retrofitting',exact:true}).click();
  await expect(page.getByRole('navigation',{name:'Retrofitting pages'}).getByRole('link',{name:'Heat pumps',exact:true})).toHaveAttribute('href','/heat-pumps');
});

test('mobile Explore menu presents the same electrical destinations as a clean accordion',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.locator('.fn-directory > summary').click();
  const directory=page.getByRole('navigation',{name:'Explore all pages'});
  const electrical=directory.locator('.fn-menu-group').filter({has:page.locator('summary').filter({hasText:'Electrical'})});
  await electrical.locator('summary').click();
  await expect(electrical.getByRole('link',{name:'Electrical overview',exact:true})).toHaveAttribute('href','/electrical');
  await expect(electrical.getByRole('link',{name:'Domestic electrical',exact:true})).toHaveAttribute('href','/electrical/domestic');
  await expect(electrical.getByRole('link',{name:'Commercial electrical',exact:true})).toHaveAttribute('href','/electrical/commercial');
  await expect(electrical.getByRole('link',{name:'Industrial electrical maintenance',exact:true})).toHaveAttribute('href','/electrical/industrial-maintenance');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
