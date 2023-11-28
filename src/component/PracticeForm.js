import * as React from "react";
import "./PracticeForm.css";
import { Input, Button, Select } from "antd";

const { TextArea } = Input;

// question type options
const questionTypeOptions = [
    {
        value: "general",
        label: "General",
    },
    {
        value: "productDesign",
        label: "Product Design",
    },
    {
        value: "productStrategy",
        label: "Product Strategy",
    },
    {
        value: "executionMetrics",
        label: "Execution and Metrics",
    },
    {
        value: "behavioralQuestions",
        label: "Behavioral Questions",
    },
];

const questionDifficultyOptions = [
    {
        value: "easy",
        label: "Easy",
    },
    {
        value: "hard",
        label: "Hard",
    },
];

const questionNumberOptions = () => {
    let res = [];
    for (let i = 1; i <= 10; i++) {
        res.push({
            value: i,
            label: String(i),
        });
    }
    return res;
};

const PracticeForm = ({ onChange, formData, onMockInterviewClick }) => {
    const onInputChange = (data, key) => {
        // console.log("input change", data, key);
        onChange({ ...formData, [key]: data });
    };

    const onSelectChange = (data, key) => {
        // console.log("=====onSelectChange====", data, key);
        onChange({ ...formData, [key]: data });
    };

    return (
        <div className="input-form">
            {/* Job information */}
            <div className="input-form-subsection">
                <div className="input-form-title">Job Information</div>
                <div className="input-form-description">
                    We recommend that you fill in a detailed description of your
                    target position, and interview questions will be tailored
                    based on the information you provide. You can also leave it
                    blank and we will provide you with generic questions.
                </div>

                {/* company name */}
                <div className="input-section-wrap">
                    <div className="input-section-label">Company Name</div>
                    <Input
                        value={formData.companyName}
                        onChange={(e) => {
                            onInputChange(e.target.value, "companyName");
                        }}
                    />
                </div>
                {/* Company Description */}
                <div className="input-section-wrap">
                    <div className="input-section-label">
                        Company Description
                    </div>
                    <TextArea
                        style={{resize:"none"}}
                        rows={4}
                        value={formData.companyDescription}
                        autoSize={false}
                        onChange={(e) => {
                            onInputChange(e.target.value, "companyDescription");
                        }}
                    />
                </div>
                {/* Position Name  */}
                <div className="input-section-wrap">
                    <div className="input-section-label">Position Name </div>
                    <Input
                        value={formData.positionName}
                        onChange={(e) => {
                            onInputChange(e.target.value, "positionName");
                        }}
                    />
                </div>
                {/* Position Responsibilities  */}
                <div className="input-section-wrap">
                    <div className="input-section-label">
                        Position Responsibilities
                    </div>
                    <TextArea
                        style={{resize:"none"}}
                        rows={4}
                        value={formData.positionResponsibilities}
                        autoSize={false}
                        onChange={(e) => {
                            onInputChange(
                                e.target.value,
                                "positionResponsibilities"
                            );
                        }}
                    />
                </div>
                {/* Position Requirements  */}
                <div className="input-section-wrap">
                    <div className="input-section-label">
                        Position Requirements
                    </div>
                    <TextArea
                        style={{resize:"none"}}
                        rows={4}
                        value={formData.positionRequirements}
                        autoSize={false}
                        onChange={(e) => {
                            onInputChange(
                                e.target.value,
                                "positionRequirements"
                            );
                        }}
                    />
                </div>
            </div>

            {/* Question information */}
            <div className="input-form-subsection subsection-with-separator">
                <div className="input-form-title">Question Information</div>
                <div className="input-form-description">
                    Please select interview question type and difficulty.
                </div>

                {/* Question type  */}
                <div className="input-section-wrap">
                    <div className="input-section-label">Question Type</div>
                    <Select
                        className="input-section-select"
                        value={formData.questionType}
                        onChange={(value) => {
                            onSelectChange(value, "questionType");
                        }}
                        options={questionTypeOptions}
                    />
                </div>

                {/* Difficulty */}
                <div className="input-section-wrap">
                    <div className="input-section-label">Difficulty</div>
                    <Select
                        className="input-section-select"
                        value={formData.questionDifficulty}
                        onChange={(value) => {
                            onSelectChange(value, "questionDifficulty");
                        }}
                        options={questionDifficultyOptions}
                    />
                </div>

                {/* Numbers */}
                <div className="input-section-wrap">
                    <div className="input-section-label">Numbers</div>
                    <Select
                        className="input-section-select"
                        value={formData.questionNumbers}
                        onChange={(value) => {
                            onSelectChange(value, "questionNumbers");
                        }}
                        options={questionNumberOptions()}
                    />
                </div>
            </div>

            {/* interviewee information */}
            <div className="input-form-subsection subsection-with-separator">
                <div className="input-form-title">Interviewee Information</div>
                <div className="input-form-description">
                    We recommend you fill in previous work, education, project
                    experience or upload resume, the interview questions will
                    generated based on your experience. You may also not provide
                    personal information and we will generate generic questions.
                </div>

                {/* Your Experience  */}
                <div className="input-section-wrap">
                    <div className="input-section-label">Your Experience</div>
                    <TextArea
                        rows={4}
                        value={formData.yourExperience}
                        autoSize={false}
                        onChange={(e) => {
                            onInputChange(e.target.value, "yourExperience");
                        }}
                    />
                </div>
            </div>

            <div className="input-form-bottom-wrap">
                <Button
                    className="form-mock-interview-button"
                    type="primary"
                    // shape="round"
                    onClick={onMockInterviewClick}>
                    Mock Interview
                </Button>
            </div>
        </div>
    );
};
export default PracticeForm;