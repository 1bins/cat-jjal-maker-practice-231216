import { useEffect, useState } from 'react';
import './App.css';
import Title from './Components/Title';
import FormBox from './Components/FormBox';
import MainCard from './Components/MainCard';
import Favorites from './Components/Favorites';

function App() {
  /**
   * 초기 세팅 함수
   */
  // 로컬스토리지 JSON
  const jsonLocalStorage = {
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
  };
  const CAT1 = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/LOADING?fontSize=60&fontColor=white";

  // 고양이 이미지 API
  const fetchCat = async (text) => {
    const OPEN_API_DOMAIN = "https://cataas.com";
    const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
    const responseJson = await response.json();
    return `${OPEN_API_DOMAIN}/cat/${responseJson._id}/says/${text}?fontSize=40&fontColor=white`
  };

  /**
   * useState
   */
  const [counter, setCounter] = useState(() => { return jsonLocalStorage.getItem("counter") });
  const [mainCat, setMainCat] = useState(CAT1);
  const [saved, setSaved] = useState(() => { return jsonLocalStorage.getItem("favorites") || [] });

  /**
   * 함수 정리
   */
  // 01. 생성 버튼 => 카운터/메인 이미지 업데이트
  const handleUpdateMain = async (text) => {
    const newCat = await fetchCat(text);

    setCounter((prev) => {
      const updateCounter = prev + 1;
      // 로컬스토리지 저장
      jsonLocalStorage.setItem("counter", updateCounter);
      return updateCounter;
    });
    // 메인이미지 변경
    setMainCat(newCat);
  };
  // 02. 하트 클릭
  const handleHeartClick = () => {
    const updateCat = [...saved, mainCat];
    setSaved(updateCat);
    // 로컬스토리지 저장
    jsonLocalStorage.setItem("favorites", updateCat);
  };
  // 03. 초기 메인 이미지
  const setInitCat = async () => {
    const initCat = await fetchCat("Make your own CAT");
    setMainCat(initCat);
  }
  useEffect(() => { setInitCat(); }, []);
  // 하트 감지
  const onChangeHeart = saved.includes(mainCat);
  // 카운터 감지
  const counterTitle = counter === null ? "" : `${counter}번째`;

  return (
    <div className="App">
      <Title>{counterTitle} 고양이 가라사대</Title>
      <FormBox onUpdateMain={handleUpdateMain}></FormBox>
      <MainCard mainCat={mainCat} onHeartClick={handleHeartClick} onChangeHeart={onChangeHeart}></MainCard>
      <Favorites savedCat={saved}></Favorites>
    </div>
  );
}

export default App;
