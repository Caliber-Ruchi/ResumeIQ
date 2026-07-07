"use client";
import { useDropzone } from "react-dropzone";
import { FileText, UploadCloud } from "lucide-react";
import { useCallback, useState } from "react";
import ScoreCard from "./ScoreCard";
import SummaryCard from "./SummaryCard";
import SkillsCard from "./SkillsCard";
import FeedbackCard from "./FeedbackCard";

export default function UploadCard({ profile }) {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [file, setFile] = useState(null);
    const [stage, setStage] = useState("");

    const onDrop = useCallback(async (acceptedFiles) => {
        if (!acceptedFiles.length) return;

        const selected = acceptedFiles[0];
        setFile(selected);

        const formData = new FormData();
        formData.append("resume", selected);

        try {
            setLoading(true);
            setStage("Uploading Resume...");

            const resPromise = fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });

            setStage("Extracting Resume...");

            const res = await resPromise;

            if (!res.ok) {
                const text = await res.text();
                console.log(text);
                throw new Error("API Failed");
            }

            const data = await res.json();

            // Debug
            console.log(data);

            setResponse(data.analysis);
            setStage("Completed");
        } catch (err) {
            console.log(err);
            setStage("");
        } finally {
            setLoading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "application/pdf": [".pdf"],
        },
    });

    return (
        <div
            {...getRootProps()}
            className={`
                border-2
                border-dashed
                rounded-2xl
                transition-all
                cursor-pointer
                p-12
                text-center
                ${isDragActive
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-slate-300 hover:border-indigo-500"
                }
            `}
        >
            <div className="mb-10 rounded-2xl border bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-2xl font-bold">

                            Welcome 👋

                        </h2>

                        <p className="mt-2 text-slate-500">

                            {profile && profile.email}

                        </p>

                    </div>

                    <div className="text-right">

                        <p className="text-sm text-slate-500">

                            Current Plan

                        </p>

                        <span
                            className={`inline-block mt-2 rounded-full px-4 py-2 text-sm font-semibold

                ${profile?.plan === "PRO"

                                    ?

                                    "bg-green-100 text-green-700"

                                    :

                                    "bg-orange-100 text-orange-700"

                                }`}
                        >

                            {profile?.plan ?? "FREE"}

                        </span>

                    </div>

                </div>

            </div>
            {
                profile?.plan === "FREE" &&

                <div className="mb-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">

                    <h2 className="text-2xl font-bold">

                        Unlock ResumeIQ Pro

                    </h2>

                    <p className="mt-2 text-indigo-100">

                        Unlimited AI Resume Reviews

                        Priority Analysis

                        Future Resume Builder

                        Job Match

                        Cover Letter Generator

                    </p>

                    <a

                        href="/pricing"

                        className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600"

                    >

                        Upgrade

                    </a>

                </div>

            }
            <input {...getInputProps()} />

            {file ? (
                <>
                    <FileText className="mx-auto h-14 w-14 text-indigo-600" />

                    <p className="mt-5 font-semibold">{file.name}</p>

                    <p className="mt-2 text-sm text-slate-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                </>
            ) : (
                <>
                    <UploadCloud className="mx-auto h-16 w-16 text-slate-400" />

                    <h3 className="mt-6 text-xl font-semibold">
                        {loading ? "Uploading..." : "Drag & Drop Resume"}
                    </h3>

                    <p className="mt-2 text-slate-500">PDF only</p>
                </>
            )}

            {loading && (
                <div className="mt-6">
                    <p className="text-sm text-slate-500">{stage}</p>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full w-3/4 animate-pulse bg-indigo-600" />
                    </div>
                </div>
            )}

            {response && (
                <div className="mt-6 rounded-xl border p-5">
                    <h3 className="font-semibold">
                        Resume Parsed Successfully
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Overall Score
                    </p>

                    <p className="mt-3 text-3xl font-bold">
                        {response.overallScore}
                    </p>
                </div>
            )}

            {response && (
                <div className="mt-10 space-y-8">

                    <ScoreCard
                        overallScore={response.overallScore}
                        atsScore={response.atsScore}
                    />

                    <SummaryCard
                        summary={response.summary}
                    />

                    <div className="grid md:grid-cols-2 gap-6">

                        <FeedbackCard
                            title="Strengths"
                            items={response.strengths}
                        />

                        <FeedbackCard
                            title="Weaknesses"
                            items={response.weaknesses}
                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        <SkillsCard
                            title="Skills Found"
                            skills={response.skillsFound}
                        />

                        <SkillsCard
                            title="Missing Skills"
                            skills={response.missingSkills}
                            color="bg-red-100"
                        />

                    </div>

                    <FeedbackCard
                        title="Recommendations"
                        items={response.recommendations}
                    />

                </div>
            )}
        </div>
    );
}