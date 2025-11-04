import { KindeOrganization, KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import { requireAuthMiddleware } from "../middlewares/auth";
import { base } from "../middlewares/base";
import { requireWorkspaceMiddleware } from "../middlewares/workspace";

export const listWorkspaces = base
	.use(requireAuthMiddleware)
	.use(requireWorkspaceMiddleware)
	.route({
		method: "GET",
		path: "/workspace",
		summary: "List all workspaces",
		tags: ["workspace"],
	})
	.input(z.void())
	.output(
		z.object({
			workspaces: z.array(
				z.object({
					id: z.string(),
					name: z.string(),
					avatar: z.string(),
				})
			),
			user: z.custom<KindeUser<Record<string, unknown>>>(),
			currentWorkspace: z.custom<KindeOrganization<unknown>>(),
		})
	)
	.handler(async ({ context, errors }) => {
		const { getUserOrganizations } = getKindeServerSession();
		const organizations = await getUserOrganizations();

		if (!organizations) {
			throw errors.NOT_FOUND;
		}

		return {
			workspaces: organizations?.orgs.map((org) => ({
				id: org.code,
				name: org.name ?? "My Workspace",
				avatar: org.name?.charAt(0) ?? "M",
			})),
			user: context.user,
			currentWorkspace: context.workspace,
		};
	});
