import { useState } from "react";

const FormBox = ({ onUpdateMain }) => {
    // 한글 확인
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

    /**
     * useState
     */
    const [value, setValule] = useState("");
    const [message, setMessage] = useState("");

    /**
     * 함수 정리
     */
    // 01. 폼 전송
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // 빈 값 체크
        if (value === "") {
            setMessage("빈 값으로 생성할 수 없습니다");
            return;
        }
        // 카운터, 이미지 업데이트
        onUpdateMain(value);
    }
    // 02. inputForm
    const handleTextChange = (e) => {
        // 영어 대문자화
        const userValue = e.target.value;
        setValule(userValue.toUpperCase());
        // 한글 체크
        setMessage("");
        if (includesHangul(userValue)) {
            setMessage("영어 대사를 입력해주세요")
        }
    }

    return (
        <div className="formBox">
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" placeholder="영어 대사를 입력해주세요" value={value} onChange={handleTextChange} />
                <button type="submit">생성</button>
            </form>
            <p className="alert-message" style={{ color: "red" }}>{message}</p>
        </div>
    );
}

export default FormBox;