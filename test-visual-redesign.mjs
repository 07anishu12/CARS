import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const base = process.env.KERB_TEST_URL || 'http://localhost:3001';
const dir = '/tmp/kerb-visual-qa';
await fs.mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true});
if(process.argv.includes('--interactions')) {
  const context=await browser.newContext({viewport:{width:390,height:844}});
  await context.addInitScript(()=>localStorage.setItem('kerb_cookie_consent_v1','accepted'));
  const page=await context.newPage();
  const assert=(condition,message)=>{if(!condition)throw Error(message);console.log('PASS',message);};
  await page.goto(base+'/cars/tata/nexon',{waitUntil:'networkidle'});
  const initial=await page.locator('.receipt-total dd').textContent();
  await page.getByLabel('Pricing city').selectOption('mumbai');
  assert(await page.locator('.receipt-total dd').textContent()!==initial,'City selection updates receipt');
  await page.locator('.variant-table button').first().click();
  assert((await page.locator('#selected-specs').textContent()).includes('Smart'),'Variant changes technical data');
  const before=await page.locator('#emi .big-number').textContent();
  await page.locator('#loan-tenure').fill('3');
  assert(await page.locator('#emi .big-number').textContent()!==before,'EMI responds to tenure');
  const originalFuel=await page.locator('#commute .big-number').textContent();
  await page.locator('#daily-distance').fill('60');
  assert(await page.locator('#commute .big-number').textContent()!==originalFuel,'Fuel estimate responds to commute');
  await page.locator('.add-ons summary').click();
  const beforeAddOn=await page.locator('.receipt-total dd').textContent();
  await page.locator('.add-ons input').first().uncheck();
  assert(await page.locator('.receipt-total dd').textContent()!==beforeAddOn,'Protection add-on updates price');
  await page.getByRole('button',{name:'Explore gallery'}).click();
  assert(await page.locator('.gallery-dialog').isVisible(),'Fullscreen gallery opens');
  const image=await page.locator('.gallery-dialog img').getAttribute('src');
  await page.keyboard.press('ArrowRight');
  assert(await page.locator('.gallery-dialog img').getAttribute('src')!==image,'Gallery keyboard navigation changes image');
  await page.getByRole('button',{name:'+ Zoom in',exact:true}).click();
  assert(await page.locator('.fullscreen-image').evaluate(el=>el.classList.contains('zoomed')),'Gallery zoom works');
  await page.keyboard.press('Escape');
  assert(!await page.locator('.gallery-dialog').isVisible(),'Escape closes gallery');
  await page.locator('#specs').evaluate(el=>scrollTo(0,el.offsetTop-140));
  await page.waitForTimeout(150);
  assert(await page.locator('.model-nav a[aria-current]').textContent()==='Specifications','Sticky section indicator follows scroll');
  const nav=await page.locator('.model-nav').boundingBox();
  assert(nav.y>=71 && nav.y<75,'Model navigation clears main header');
  await page.setViewportSize({width:320,height:740});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'320px showroom has no overflow');
  await page.goto(base+'/cars');
  await page.getByRole('button',{name:'Filters'}).click();
  assert(await page.locator('.filter-dialog').isVisible(),'Mobile filters open as native modal');
  await page.locator('.filter-dialog').getByRole('button',{name:'Electric',exact:true}).click();
  await page.screenshot({path:dir+'/filters-selected-320.png'});
  const color=await page.locator('.filter-dialog button[data-tone="Electric"]').evaluate(el=>getComputedStyle(el).color);
  assert(color==='rgb(120, 216, 223)','Electric selection uses semantic cyan');
  await page.locator('.filter-dialog-actions').getByRole('button',{name:/Show/}).click();
  assert(await page.locator('.vehicle-preview').count()===2,'Fuel filter updates results');
  await page.getByRole('button',{name:'Filters'}).click();
  await page.locator('.filter-dialog-actions').getByRole('button',{name:'Reset',exact:true}).click();
  await page.keyboard.press('Escape');
  assert(await page.locator('.vehicle-preview').count()===6,'Reset restores all vehicles');
  await page.goto(base+'/compare?cars=nexon,creta');
  const rowCount=await page.locator('.comparison-table tbody tr').count();
  await page.getByLabel('Show differences only').check();
  assert(await page.locator('.comparison-table tbody tr').count()<rowCount,'Difference filter removes equal rows');
  await page.getByRole('button',{name:'Add vehicle'}).click();
  assert(await page.locator('.comparison-car').count()===3,'Comparison adds third equal column');
  await page.locator('.comparison-scroll').evaluate(el=>el.scrollLeft=250);
  const fixed=await page.locator('.fixed-attribute').first().boundingBox();
  assert(fixed.x>=15 && fixed.x<=18,'Attribute column stays fixed during horizontal scroll');
  for(const topic of ['specs','images','price','reviews','variants','mileage','safety']) {
    const response=await page.goto(base+'/cars/tata/nexon/'+topic);
    assert(response.status()===200 && (await page.locator('link[rel="canonical"]').getAttribute('href')).endsWith('/'+topic),'Crawlable topic route: '+topic);
  }
  const invalid=await page.goto(base+'/cars/tata/nexon/not-a-city');
  assert(invalid.status()===404,'Unknown city returns 404');
  await page.goto(base+'/new-cars');
  await page.getByRole('button',{name:'Electric',exact:true}).click();
  assert(await page.locator('.vehicle-preview').count()===2,'New-car powertrain selection works');
  await page.getByLabel('Waiting period city').selectOption('mumbai');
  assert((await page.locator('.new-cars-page').textContent()).includes('Mumbai dealer data'),'Waiting table reflects selected city');
  await page.getByRole('button',{name:'Save to watchlist'}).first().click();
  assert(await page.getByRole('button',{name:'Saved for this visit'}).count()===1,'Watchlist selection updates visibly');
  await browser.close();
  process.exit(0);
}
if(process.argv.includes('--extras')) {
 const context=await browser.newContext({viewport:{width:390,height:844}});
 await context.addInitScript(()=>localStorage.setItem('kerb_cookie_consent_v1','accepted'));
 const page=await context.newPage();
 for(const path of ['/emi-calculator','/search?q=under%2010%20lakh','/cars/hyundai/creta','/cars/mahindra/xuv700','/cars/kia/seltos','/cars/maruti-suzuki/grand-vitara','/cars/mg/windsor-ev']) {
  await page.goto(base+path,{waitUntil:'networkidle'});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+path);
  await page.screenshot({path:dir+'/extra-'+path.replaceAll('/','-').replaceAll('?','-')+'.png'});
  console.log('PASS extra route',path);
 }
 await page.goto(base+'/emi-calculator');
 await page.locator('#interestRateInput').fill('0');
 if(!(await page.locator('.finance-lines').textContent()).includes('₹0'))throw Error('Zero-interest calculation failed');
 await page.screenshot({path:dir+'/finance-mobile.png'});
 console.log('PASS zero-interest finance scenario');
 await browser.close(); process.exit(0);
}
if(process.argv.includes('--performance')) {
 const measurements=[];
 for(const [width,height] of [[1440,900],[390,844]]) {
  for(const route of ['/','/cars/tata/nexon','/cars','/compare','/new-cars']) {
   const context=await browser.newContext({viewport:{width,height}});
   await context.addInitScript(()=>{
    localStorage.setItem('kerb_cookie_consent_v1','accepted');
    window.kerbVitals={lcp:0,cls:0};
    new PerformanceObserver(list=>{for(const e of list.getEntries())window.kerbVitals.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.kerbVitals.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
   });
   const page=await context.newPage();
   await page.goto(base+route,{waitUntil:'networkidle'});
   await page.waitForTimeout(300);
   const vitals=await page.evaluate(()=>window.kerbVitals);
   measurements.push({route,width,...vitals});
   console.log('LOCAL VITALS',route,width,JSON.stringify(vitals));
   await page.screenshot({path:dir+'/production-'+(route==='/'?'home':route.replaceAll('/','-'))+'-'+width+'.png'});
   await context.close();
  }
 }
 await fs.writeFile(dir+'/local-performance.json',JSON.stringify(measurements,null,2));
 await browser.close();process.exit(0);
}
const sizes=[[1440,900],[1280,800],[1024,768],[768,1024],[390,844],[375,812],[320,740]];
const routes=['/','/cars/tata/nexon','/cars','/compare?cars=nexon,creta','/new-cars'];
const report=[]; const errors=[];
for(const [width,height] of sizes) {
  const context=await browser.newContext({viewport:{width,height}, reducedMotion:'reduce'});
  await context.addInitScript(()=>localStorage.setItem('kerb_cookie_consent_v1',JSON.stringify({essential:true,analytics:false,marketing:false})));
  const page=await context.newPage();
  page.on('pageerror',error=>errors.push(error.message));
  for(const route of routes) {
    await page.goto(base+route,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const name=route==='/'?'home':route.includes('nexon')&&!route.includes('compare')?'showroom':route.split('?')[0].slice(1);
    await page.screenshot({path:`${dir}/${name}-${width}-top.png`});
    for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700) { await page.evaluate(y=>scrollTo(0,y),y); await page.waitForTimeout(80); }
    await page.waitForTimeout(250);
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:`${dir}/${name}-${width}.png`,fullPage:true});
    if(name==='showroom' && [1440,390,320].includes(width)) {
      for(const id of ['specs','safety','emi','images']) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        await page.evaluate(id=>window.scrollTo(0,document.getElementById(id).offsetTop-140),id);
        await page.waitForTimeout(150);
        await page.screenshot({path:`${dir}/${name}-${width}-${id}.png`});
      }
    }
    const info=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,brokenImages:[...document.images].filter(image=>image.complete && image.naturalWidth===0).map(image=>image.src)}));
    report.push({route,width,height,...info});
    if(info.scrollWidth>width || info.h1!==1 || info.brokenImages.length) { console.error('ISSUE',route,width,info); console.error(await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>innerWidth && getComputedStyle(el).position!=='absolute').map(el=>({tag:el.tagName,cls:el.className,width:el.getBoundingClientRect().width})).slice(0,30))); }
    console.log('Captured',name,width);
  }
  await context.close();
}
await fs.writeFile(`${dir}/report.json`,JSON.stringify({report,errors},null,2));
await browser.close();
console.log('Screenshots:',dir,'runtime errors:',errors.length);
if(errors.length||report.some(row=>row.scrollWidth>row.width||row.h1!==1||row.brokenImages.length))process.exitCode=1;
