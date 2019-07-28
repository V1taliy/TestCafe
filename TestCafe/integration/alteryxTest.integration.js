import { Selector, ClientFunction } from 'testcafe';
const pjson =  require("../../package.json");
const BASE_URL = pjson.baseUrl;
const FIRST_URL = `${BASE_URL}/first`;
const SECOND_URL = `${BASE_URL}/second`;

const RED_TEXT = 'Incorrect';
const GREEN_TEXT = 'Correct';

const RED_COLOR = 'rgb(255, 0, 0)';
const GREEN_COLOR = 'rgb(0, 255, 0)';

const SOME_TEXT = 'Some text';
const SELECT_H2 = 'H2';
const EXAMPLE_WORD = 'h1>span';


class PageModel {
    constructor () {
        this.buttonGoToSecondPage = Selector("div>button").nth(2); 
        this.wordOnSecondPage     = Selector(".D3U4iS3UsP2qreF12xK4h");
        this.inputField           = Selector("input");
    }
}
const page = new PageModel();

fixture `Let's testing Alteryx QA task`
    .page `http://alteryx-qa-test.surge.sh`;

//check if url is correct. It means it's same as expected (first), no redirection happened after initial attempt to access
  test('First page loaded with correct URL', async t => {
    const getLocationFirtPage = ClientFunction(() => document.location.href);
    await t
     .expect(getLocationFirtPage()).contains(FIRST_URL)
    });

//click on button and check if url is correct after redirection
  test('Button [Go to second page] clicked and second page loaded with correct URL', async t => {
      await t
      .click(page.buttonGoToSecondPage);
      
      const getLocationSecondtPage = ClientFunction(() => document.location.href);
     
      await t
      .expect(getLocationSecondtPage()).contains(SECOND_URL);
  });

//check that h2 text is 'Incorrect' and color is red by default  
  test("H2 text is 'Incorrect' and text is red by default", async t => {
      await t
      .click(page.buttonGoToSecondPage)
      .expect(page.wordOnSecondPage.innerText).contains(RED_TEXT)
      .expect(page.wordOnSecondPage.getStyleProperty('color')).eql(RED_COLOR);
      });

//type correct value and check that h2 text is 'Correct' and color is green      
  test("Enter correct value and H2 text is 'Correct' and text is green", async t => {
       await t
      .click(page.buttonGoToSecondPage)
      const select = await Selector(EXAMPLE_WORD).innerText;
      
      await t
      .typeText(page.inputField, select)
      const correctWord = await Selector(SELECT_H2);
  
      await t
      .expect(correctWord.innerText).contains(GREEN_TEXT)
      .expect(correctWord.getStyleProperty('color')).eql(GREEN_COLOR);
      });

//type incorrect value and check that h2 text is 'Incorrect' and color is red      
  test("Enter incorrect value and H2 text is 'Incorrect' and text is red", async t => {
      await t
     .click(page.buttonGoToSecondPage)
     
     await t
     .typeText(page.inputField, SOME_TEXT)
     
     await t
     .expect(page.wordOnSecondPage.innerText).contains(RED_TEXT)
     .expect(page.wordOnSecondPage.getStyleProperty('color')).eql(RED_COLOR);
     });
