import { NextResponse } from "next/server";
import { extractResumeText } from "@/lib/pdf";
import { reviewResume } from "@/lib/gemini";

export async function POST(request) {

    try{

        const formData=await request.formData();

        const file=formData.get("resume");

        if(!file){

            return NextResponse.json(
                {
                    error:"Resume missing."
                },
                {
                    status:400
                }
            );

        }

        const text = await extractResumeText(file);

        const analysis = await reviewResume(text);

        return NextResponse.json({
            success: true,
            analysis,
        });

    }

    catch (err) {
        console.error("Analyze API Error:");
        console.error(err);

        return NextResponse.json(
            {
            success: false,
            error: err.message,
            },
            {
            status: 500,
            }
        );
    }

}