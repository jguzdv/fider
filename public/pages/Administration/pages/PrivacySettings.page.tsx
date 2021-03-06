import "./PrivacySettings.page.scss";

import React from "react";
import { Toggle, Form } from "@fider/components/common";
import { actions, notify, Fider } from "@fider/services";
import { AdminBasePage } from "../components";

interface PrivacySettingsPageState {
  isPrivate: boolean;
}

export class PrivacySettingsPage extends AdminBasePage<{}, PrivacySettingsPageState> {
  public id = "p-admin-privacy";
  public name = "privacy";
  public icon = "key";
  public title = "Privacy";
  public subtitle = "Manage your site privacy";

  constructor(props: {}) {
    super(props);

    this.state = {
      isPrivate: Fider.session.tenant.isPrivate
    };
  }

  private toggle = async (active: boolean) => {
    this.setState(
      state => ({
        isPrivate: active
      }),
      async () => {
        const response = await actions.updateTenantPrivacy(this.state.isPrivate);
        if (response.ok) {
          notify.success("Your privacy settings have been saved.");
        }
      }
    );
  };

  public content() {
    return (
      <Form>
        <div className="c-form-field">
          <label htmlFor="private">Private site</label>
          <Toggle disabled={!Fider.session.user.isAdministrator} active={this.state.isPrivate} onToggle={this.toggle} />
          <p className="info">
            A private site prevents unauthenticated users from viewing or interacting with its content. <br /> If
            enabled, only already registered and invited users will be able to sign in to this site.
          </p>
        </div>
      </Form>
    );
  }
}
