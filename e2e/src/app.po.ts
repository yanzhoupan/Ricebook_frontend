import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  setLogUsername(name){
    var nameInput = element(by.id("usernameRef"));
    nameInput.sendKeys(name);
    browser.sleep(1000);
  }

  setLogPassword(pw){
    var pwInput = element(by.id("passwordRef"));
    pwInput.sendKeys(pw);
    browser.sleep(1000);
  }

  getLoginBtn(){
    browser.sleep(1000);
    return element(by.id('btnRef'));
  }

  setNewUserName(username) { 
    var unInput = element(by.id("un"));
    unInput.sendKeys(username)
    browser.sleep(1000);
  }

  setNewDisplayName(displayname){
    var disName = element(by.id("display"));
    disName.sendKeys(displayname)
    browser.sleep(1000);
  }

  setNewEmail(email){
    var em = element(by.id("em"));
    em.sendKeys(email)
    browser.sleep(1000);
  }

  setNewZip(zip){
    var zipcode = element(by.id("zip"));
    zipcode.sendKeys(zip)
    browser.sleep(1000);
  }

  setNewPhone(ph){
    var phone = element(by.id("ph"));
    phone.sendKeys(ph)
    browser.sleep(1000);
  }

  setNewBod(dob){
    var birth = element(by.id("birth"));
    birth.sendKeys(dob)
    browser.sleep(1000);
  }

  setNewPw(pw){
    var password = element(by.id("pw"));
    password.sendKeys(pw)
    browser.sleep(1000);
  }

  setNewRePw(repw){
    var repeat = element(by.id("repw"));
    repeat.sendKeys(repw);
    browser.sleep(1000);
  }

  getRegBtn(){
    browser.sleep(1000);
    return element(by.id('regBtn'));
  }

  getArticlesCnt(){
    // get the articles from the main page
    return element.all(by.css(".articlesView")).count()
  }

  setNewArticleText(text){
    var newPost = element(by.id("newPost"));
    newPost.sendKeys(text);
    browser.sleep(1000)
  }

  getPostBtn(){
    return element(by.id("postBtn"))
  }

  getHeadLine(){
    return element(by.id("headline")).getText()
  }

  setNewHeadLine(newHeadline){
    var newHead = element(by.id("newHeadline"));
    newHead.sendKeys(newHeadline);
    browser.sleep(1000);
  }

  getUpdateHeadlineBtn(){
    return element(by.id("updateHeadlineBtn"))
  }

  getLogoutBtn(){
    return element(by.id("logoutBtn"));
  }

  setSearchKeyword(keyword){
    var key = element(by.id("searchKeyword"))
    key.sendKeys(keyword)
    browser.sleep(1000)
  }

}