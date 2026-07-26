---
title: Organization Manager
description: Members, identity providers, and access policies.
---

Version 0.2.9.

## What it does

Organization Manager manages who belongs to your organization: members and their roles, pending invitations, and per-member permission grants layered on top of those roles. Each member's row also shows which identity provider they signed in with — Google, Okta, Azure, GitHub, or a local account.

## When you'd use it

Add or remove a teammate, change someone's role, grant one person a permission beyond what their role normally includes, or check on — or resend or revoke — a pending invitation.

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). It contributes the **Organization: Open Access** command and a sidebar entry titled **Organization Access**.

## Key screens

An org context bar sits above two tabs, **Members** and **Invitations**:

- **Org context bar** — the organization's name and your role in it, member and pending-invitation counts, and, if you're allowed, **Invite people** and **Delete org** buttons.
- **Members** — a searchable, role-filterable (All / Owner / Admin / Member / Guest) table: avatar and name/email, an identity-provider badge, an org-role chip, an MFA badge, the groups they have access to (or "All groups" for an admin), and last-seen time. A row's delete icon only appears if you're allowed to remove that member. Clicking a row opens the member drawer.
- **Invitations** — pending and expired invitations in separate groups, each row showing email, role, who sent it, when, and time to expiry, with **Copy link**, **Resend**, and **Revoke** actions; an empty state prompts you to invite people.
- **Invite people** modal — a multi-email box (comma-, space-, or newline-separated, with live valid/invalid counts and a warning if an address is on an external domain) and a role picker (Owner, Admin, Member, or Guest, each with a one-line description).
- **Member drawer** — org role (editable, unless they're the organization's only owner), identity provider, MFA, joined and last-seen dates; a **Permissions** section, shown only if you can manage grants, listing the organization's grantable permissions grouped by category — greyed "IN ROLE" where the member's role already includes it, otherwise an individual toggle, plus **Save permissions**; a **Group access** section; and a **Danger zone** with suspend/reactivate and **Remove from organization**.
- **Delete organization** modal — only available if you can delete the organization; requires typing its name to confirm, and warns that deleting removes it from Keycloak entirely — memberships and pending invitations included — and cannot be undone.

## Common tasks

- **Invite someone** — org context bar's **Invite people** → enter emails and pick a role → send; they land in the **Invitations** tab.
- **Change a member's role** — open their row, use the org-role selector in the drawer (locked if they're the organization's only remaining owner).
- **Grant one member an extra permission** — open their row, use the drawer's **Permissions** section to toggle something beyond their role, then **Save permissions**.
- **Suspend or remove a member** — drawer's **Danger zone**.
- **Resend or revoke an invitation** — row actions on the **Invitations** tab.

## Permissions requested

`commands.register`, `authentication.session`, `notifications.show`.

## Known limits

- Despite the name, there's no separate screen for configuring identity providers or SSO here — a member's provider is a read-only badge (Google, Okta, Azure, GitHub, or Local), not something this view lets you set up.
- The UI stops you from removing yourself or an organization's only owner; removal and role changes are also checked server-side.
- Data is scoped to your active organization; switching organizations (or accounts) reloads the view.

*Written from source; not verified against a live backend.*

## Related

[Sign In](/get-started/sign-in) — how organizations and personal workspaces work, and how to switch between them.
