import UpdatePasswordForm from '@/components/settings/update-password-form';
import UpdateProfileForm from '@/components/settings/update-profile-form';

export default function Page() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="font-bold font-serif text-2xl">General Information</h1>
        <UpdateProfileForm />
      </div>
      <div className="space-y-2">
        <h1 className="font-bold font-serif text-2xl">Security</h1>
        <UpdatePasswordForm />
      </div>
    </>
  );
}
