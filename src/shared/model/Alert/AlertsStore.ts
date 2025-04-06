import { makeAutoObservable } from 'mobx';
import { Alert } from './Alert';

export class AlertsStore {
  private alerts: Alert[] = [];
  currentAlert: Alert | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addAlert(alert: Alert) {
    if (alert.dismissedKey && JSON.parse(localStorage.getItem('dismissedAlerts') || '[]').includes(alert.dismissedKey)) return;

    this.alerts.push(alert);

    if (!this.currentAlert) {
      this.showNextAlert();
    }
  }

  closeAlert() {
    this.currentAlert = null;
    this.showNextAlert();
  }

  showNextAlert() {
    if (this.alerts.length > 0) {
      this.currentAlert = this.alerts.shift()!;
    }
  }

  removeAlertsByTag(tag: string) {
    this.alerts = this.alerts.filter(alert => alert.tag !== tag);

    if (this.currentAlert && this.currentAlert.tag === tag) {
      this.closeAlert();
    }
  }

  clear() {
    this.alerts = [];
    this.currentAlert = null;
  }
}
