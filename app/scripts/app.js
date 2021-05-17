/**
 * Show a notification toast with the given type and message
 *
 * @param {String} type - type of the notification
 * @param {String} message - content to be shown in the notification
 **/
function showNotify(type, message) {
  return client.interface.trigger("showNotify", {
    type: type,
    message: message
  });
}

/**
 * It opens the ticket details page for the given ticket id
 *
 * @param {number} ticketId - Ticket to open
 */
function goToTicket(ticketId) {

}

/**
 * It opens the contact details page for the give contact id
 *
 * @param {number} contactId - Contact to open
 */
function goToContact(contactId) {

}

/**
 * It shows the given number in the CTI app widget as missed calls intimation
 *
 * @param {number} missedCalls - The number of missed calls to show in the CTI app icon
 */
function showMissedCall(missedCalls) {

}

/**
 * It hides the missed calls intimation in the CTI app widget
 */
function hideMissedCall() {

}

/**
 * It creates a ticket in Freshdesk for the call
 */
async function createTicket() {

}

/**
 * It retrieves the list of contacts from Freshdesk
 */
function getContacts() {

}

/**
 * It creates a contact in Freshdesk with the phone number
 */
function createContact() {

}

/**
 * To get the logged in user in Freshdesk
 */
function getLoggedInUser() {
  client.data.get("loggedInUser").then(
    function (data) {
      console.info('Successfully got loggedInUser data');
      showNotify('info', `User's name: ${data.loggedInUser.contact.name}`);
    },
    function (error) {
      console.error('Error: Failed to get the loggedInUser information');
      console.error(error);
    });
}

/**
 * To open the CTI app
 */
function openApp() {

}

/**
 * To close the CTI app
 */
function closeApp() {

}

/**
 * To listen to click event for phone numbers in the Freshdesk pages and use the clicked phone number
 */
function clickToCall() {

}

/**
 * To resize the height of the CTI app
 */
function resizeApp() {
  client.instance.resize({ height: '450px' });
}

function onAppActivate() {
  /* Sample values to test the app functionality */
  const TICKET_ID = 12;
  const CONTACT_ID = 48012335223;
  const MISSED_CALLS = 11;

  resizeApp();

  /* Adding event handlers for all the buttons in the UI of the app */
  document.getElementById('btnGetUser').addEventListener('fwClick', getLoggedInUser);
  document.getElementById('btnClose').addEventListener('fwClick', closeApp);
  document.getElementById('btnShowMissedCalls').addEventListener('fwClick', function () { showMissedCall(MISSED_CALLS) });
  document.getElementById('btnHideMissedCalls').addEventListener('fwClick', hideMissedCall);
  document.getElementById('btnCreateTicket').addEventListener('fwClick', createTicket);
  document.getElementById('btnGotoTicket').addEventListener('fwClick', function () { goToTicket(TICKET_ID) });
  document.getElementById('btnGetContacts').addEventListener('fwClick', getContacts);
  document.getElementById('btnCreateContact').addEventListener('fwClick', createContact);
  document.getElementById('btnGotoContact').addEventListener('fwClick', function () { goToContact(CONTACT_ID) });
  /* Click-to-call event should be called inside the app.activated life-cycle event to always listen to the event */
  clickToCall();
}

document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(console.error);

    function getClient(_client) {
      window.client = _client;
      client.events.on('app.activated', onAppActivate);
    }
  }
};
