import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const navigateTo = (router: AppRouterInstance, path: string) => {
    router.push(path);
}