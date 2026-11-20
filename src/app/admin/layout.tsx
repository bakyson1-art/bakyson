export const dynamic = 'force-dynamic';

import { currentUser } from '@/lib/auth';
import AdminShell from '@/app/admin/shell';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  return <AdminShell user={user}>{children}</AdminShell>;
}
