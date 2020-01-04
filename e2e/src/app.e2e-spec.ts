import { AppPage } from './app.po';
import { browser, logging, protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // it('should display the app title', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual('Ricebook');
  // });

  it("should register a new user", (done)=>{
    // detact the alert information to be "Successful registerred..."
    // do the registeration.
    page.navigateTo();
    page.setNewUserName("realUser");
    page.setNewDisplayName("newDisplayName");
    page.setNewEmail("test@email.com");
    page.setNewPhone("(123)456-7890");
    page.setNewBod("12-01-1997");
    page.setNewZip("12345");
    page.setNewPw("123");
    page.setNewRePw("123");
    page.getRegBtn().click();
    browser.sleep(1000)
    let regAlert = browser.switchTo().alert();
    expect(regAlert.getText()).toEqual("Successfully created a new user! You can login now!")
    // browser.driver.get('URL');
    browser.sleep(500)
    browser.switchTo().alert().accept();
    done();
  });

  it("should log in the new user", ()=>{
    page.navigateTo();
    page.setLogUsername("realUser");
    page.setLogPassword('123');
    page.getLoginBtn().click();
    var url = browser.getCurrentUrl();
    // var url = browser.baseUrl
    expect(url).toEqual("http://localhost:4200/#/main?username=realUser");
  });

  it("should post new article", ()=>{
    // page.navigateTo();
    // page.setLogUsername("realUser");
    // page.setLogPassword('123');
    // page.getLoginBtn().click();

    // const pageCntBefore = page.getArticlesCnt()
    page.setNewArticleText("This is the first article for the new user");
    page.getPostBtn().click();
    browser.sleep(1000)
    const pageCntAfterPost = page.getArticlesCnt()
    expect(pageCntAfterPost).toEqual(1);
  });

  it("should update the headline for the new user", ()=>{
    var oldhead = page.getHeadLine();
    page.setNewHeadLine("new headline");
    page.getUpdateHeadlineBtn().click();
    browser.sleep(1000);
    expect(page.getHeadLine()).not.toEqual(oldhead)
    expect(page.getHeadLine()).toEqual("new headline")
  });

  it("should log out the new user", ()=>{
    page.getLogoutBtn().click()
    var url = browser.getCurrentUrl();
    expect(url).toEqual("http://localhost:4200/#/auth");
  });

  it("should login a test user", ()=>{
    // expect(page.navigateTo()).toEqual("/main")
    page.navigateTo();
    page.setLogUsername("yp24");
    page.setLogPassword('123');
    page.getLoginBtn().click();
    var url = browser.getCurrentUrl();
    // var url = browser.baseUrl
    expect(url).toEqual("http://localhost:4200/#/main?username=yp24");
  });

  it("should search with a keyword that matches only one article of test user", ()=>{
    // detact the change of the number of the articles.
    page.setSearchKeyword("1st");
    browser.sleep(1000);
    expect(page.getArticlesCnt()).toEqual(1)
  });

  it("should log out the text user", ()=>{
    // click logout and judge will it go to auth page.
    page.getLogoutBtn().click()
    var url = browser.getCurrentUrl();
    expect(url).toEqual("http://localhost:4200/#/auth");
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
