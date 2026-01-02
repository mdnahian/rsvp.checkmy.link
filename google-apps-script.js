/**
 * Google Apps Script for Nikah RSVP Form
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to Google Sheets (sheets.google.com) and create a new spreadsheet
 * 
 * 2. Name your spreadsheet (e.g., "Nikah RSVP Responses")
 * 
 * 3. Add headers in Row 1:
 *    A1: Timestamp
 *    B1: Guest Name
 *    C1: Party Size
 * 
 * 4. Go to Extensions → Apps Script
 * 
 * 5. Delete any existing code and paste this entire file
 * 
 * 6. Click the floppy disk icon to Save (or Ctrl+S)
 * 
 * 7. Click "Deploy" → "New deployment"
 * 
 * 8. Click the gear icon next to "Select type" → Choose "Web app"
 * 
 * 9. Set the following:
 *    - Description: "RSVP Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 
 * 10. Click "Deploy"
 * 
 * 11. Authorize the app when prompted (click through the warnings)
 * 
 * 12. Copy the Web App URL that appears
 * 
 * 13. Paste that URL in your index.html file where it says:
 *     const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
 * 
 * That's it! Your form will now save responses to your Google Sheet.
 */

function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Append a new row with the form data
    sheet.appendRow([
      new Date(),           // Timestamp
      data.guestName,       // Guest Name
      data.partySize        // Party Size
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'RSVP recorded successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// This function handles GET requests (optional - for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'OK', 
      message: 'RSVP API is running' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

