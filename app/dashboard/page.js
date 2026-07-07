import UploadCard from "@/components/UploadCard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {

    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }
    const { data: profile,error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    console.log("USER:", user.id);
    console.log("PROFILE:", profile);
    console.log("ERROR:", error);
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto py-14 px-6">
                <h1 className="text-5xl font-bold">
                    ResumeIQ
                </h1>
                <p className="mt-3 text-slate-500">
                    AI Powered ATS Resume Reviewer
                </p>
                <div className="mt-14">
                    <UploadCard  profile={profile}/>
                </div>
            </div>

        </main>

    )

}