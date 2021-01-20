import { useState } from 'react';
import InfiniteScroll from "react-infinite-scroller"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Skeleton from '@material-ui/lab/Skeleton';
import ElevationScroll from './ElevationScroll';


function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 800,
    },
  }));
  const classes = useStyles();

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
    <div className={classes.root}>
      <ElevationScroll />
      <GridList cellHeight={200} className={classes.gridList} cols={3}>
        {list.map((value, index) => (
          <GridListTile key={index}>
              <img src={value.url} alt='cat' key={index} />
            <Skeleton variant="rect" height={500} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

  //ロード中に表示する項目
  const loader = <div className="loader" key={0}></div>;

  return (
    <div>
      <InfiniteScroll
        loadMore={loadMore}    //項目を読み込む際に処理するコールバック関数
        hasMore={hasMore}      //読み込みを行うかどうかの判定
        loader={loader}
      >      {/* 読み込み最中に表示する項目 */}
        {items}             {/* 無限スクロールで表示する項目 */}
      </InfiniteScroll>
    </div>
  );
}

export default App;
