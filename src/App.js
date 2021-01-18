import {useState} from 'react';
import InfiniteScroll  from "react-infinite-scroller"

function App() {
  // 表示するデータ
  const [list, setList] = useState([]);
  // 再読み込み判定
  const [hasMore, setHasMore] = useState(true);

  // データ読み込むときのコールバック
  const loadMore = async (page) => {

    // 猫ちゃんの画像API呼び出し
    const response = await fetch('https://api.thecatapi.com/v1/images/search');  //API通信
    const data = await response.json();  //取得データ

    //データ件数が0件の場合、処理終了
    if (data.length < 1) {
      setHasMore(false);
      return;
    }

    //取得データをリストに追加
    setList([...list, ...data])
  }

  //各スクロール要素
  const items = (
    <ul>
      {list.map((value,key) => 
      <img
        src={value.url}
        alt='ネコちゃんの画像'
        key={key}
      />
        )
      }
    </ul>);
  
  //全体のスタイル
  const root_style = {
    margin : "0 auto"
  }

  //ロード中に表示する項目
  const loader =<div className="loader" key={0}>Loading ...</div>;


  return (
    <div style={root_style}>
      <InfiniteScroll
        loadMore={loadMore}    //項目を読み込む際に処理するコールバック関数
        hasMore={hasMore}      //読み込みを行うかどうかの判定
        loader={loader}>      {/* 読み込み最中に表示する項目 */}

          {items}             {/* 無限スクロールで表示する項目 */}
      </InfiniteScroll>
    </div>
  );
}

export default App;
