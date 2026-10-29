"use client";

import { useActionState } from "react";

import { inviteStaff } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import type { ActionState } from "@/types";

const INITIAL: ActionState = { status: "idle" };

export function InviteForm() {
  const [state, action, pending] = useActionState(inviteStaff, INITIAL);

  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <Field label="Name" htmlFor="invite-name">
        <Input id="invite-name" name="name" required autoComplete="name" />
      </Field>
      <Field label="Email" htmlFor="invite-email">
        <Input id="invite-email" name="email" type="email" required autoComplete="email" />
      </Field>
      <Field label="Role" htmlFor="invite-role">
        <Select id="invite-role" name="role" defaultValue="manager">
          <option value="manager">Manager</option>
          <option value="content_editor">Content editor</option>
          <option value="cashier">Cashier</option>
          <option value="waiter">Waiter</option>
          <option value="kitchen">Kitchen</option>
        </Select>
      </Field>
      <div className="flex items-end">
        <Button type="submit" variant="ember" loading={pending}>
          Send invite
        </Button>
      </div>
      {state.message ? (
        <p className={state.status === "error" ? "text-destructive md:col-span-2 text-sm" : "md:col-span-2 text-sm"}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
