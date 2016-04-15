/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
        http://aws.amazon.com/apache2.0/
    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Lingo Info for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = amzn1.echo-sdk-ams.app.d4f06560-82af-4a46-a45a-368598946131

/**
 * Array containing space facts.
 */
var SPACE_FACTS = [
  "There are around seven thousand languages and dialects spoken in the world today.",
  "About two thousand two hundred languages are spoken in Asia alone.",
  "UNESCO warns that around two thousand five hundred languages are classified as being at risk of extinction.",
  "The United Nations have six official languages: Arabic, Mandarin, English, French, Russian and Spanish.",
  "The country with the most official languages is South Africa, with eleven languages.",
  "The longest word in English is 'pneumonoultramicroscopicsilicovolcanoconiosis', a type of lung disease.",
  "If you have a fear of long words, you have 'hippopotomonstrosesquipedaliophobia'.",
  "Khmer, a language from Cambodia, has the largest alphabet with seventy two letters.",
  "Cryptophasia is a phenomenon when twins develop their own private language.",
  "A 'polyglot' is a person who can speak multiple languages.",
  "American actress Sandra Bullock grew up in Nuremberg and speaks German fluently.",
  "'Grey's Anatomy' star Sandra Oh speaks English, Korean and French.",
  "Christopher Waltz, star of the Tarantino movie 'Inglourious Bastards', speaks French, German and English.",
  "Pop star Shakira speaks 6 languages: Spanish, Portuguese, English, French, Italian and Arabic.",
  "American actors Joseph Gordon-Levitt and Bradley Cooper both speak French.",
  "Although there are about fifty thousand characters in Chinese, you only need to learn about two thousand in order to read a newspaper.",
  "The world's oldest languages are thought to be Sanskrit, Sumerian, Hebrew and Basque.",
  "Esperanto, the most widely spoken artificial language, mixes Romance and Germanic vocabulary with Slavic grammar.",
  "'Lord of the Rings' author J. R. R. Tolkien invented several languages spoken by the characters in his work.",
  "In the late 90s, many dedicated Star Trek fans learned Klingon, a fictional language spoken by an alien species.",
  "The five most spoken languages in the world are: Chinese, Spanish, English, Hindi and Arabic.",
  "Every two weeks a language dies.",
  "Over two thousand languages are spoken in Africa today.",
  "The five most widely spoken languages in Africa are: Arabic, Swahili, Hausa, English and Amharic.",
  "Over eight hundred and twenty languages are spoken in Papua New Guinea.",
  "Spanish, Portuguese, Italian, French and Romanian are considered Romance or Latin languages.",
  "Russian, Polish, Czech, Ukranian and Bulgarian are considered Slavic languages.",
  "English, German, Dutch, Swedish and Icelandic are considered Germanic languages.",
  "Rotokas, a language spoken in Papua New Guinea has the smallest alphabet containing only twelve letters.",
  "By the age of sixteen, Tim Doner had learned over 20 languages."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SpaceGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGeek.prototype = Object.create(AlexaSkill.prototype);
SpaceGeek.prototype.constructor = SpaceGeek;

SpaceGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("LingoInfo onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SpaceGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("LingoInfo onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SpaceGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("LingoInfo onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

SpaceGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Lingo Info tell me a language fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random language fact from the language facts list
    var factIndex = Math.floor(Math.random() * SPACE_FACTS.length);
    var fact = SPACE_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your language fact: " + fact;

    response.tellWithCard(speechOutput, "LingoInfo", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var spaceGeek = new SpaceGeek();
    spaceGeek.execute(event, context);
};
