public with sharing class CheckLeadStatusController {
  @AuraEnabled
  public static Boolean checkIsOpen(Id leadId) {
    try {
      Lead l = [
        SELECT Id, Status, Checked_lead_status__c
        FROM LEAD
        WHERE Id = :leadId
      ];
      l.Checked_lead_status__c = true;
      update l;
      return l.status == 'Open - Not Contacted';
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
