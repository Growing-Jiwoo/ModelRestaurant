import axios from 'axios';

interface ViewCountData {
  id: string;
  viewCnt: number;
}

export async function submitViewCntData() {
  const viewCntData: ViewCountData[] = JSON.parse(
    localStorage.getItem('viewCnt') || 'null'
  );

  if (viewCntData) {
    const data: { viewCnt: { [key: string]: number } } = {
      viewCnt: Object.fromEntries(
        viewCntData.map(({ id, viewCnt }: ViewCountData) => [id, viewCnt])
      ),
    };
    const url = 'http://127.0.0.1:8000/addViewCnt';
    const response = await axios.put(url, data);

    return response;
  }

  return;
}
