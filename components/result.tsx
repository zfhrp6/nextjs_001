import CSS from 'csstype';
import { useAtomValue } from 'jotai';
import { songsState, idolsState } from '../const/atoms';
import { Brand } from '../types/types';
import { brandColor } from '../utils/util';

const Result = (): JSX.Element => {
  const songs = useAtomValue(songsState);
  const idols = useAtomValue(idolsState);
  const tableBorderStyle: CSS.Properties = { borderBottom: 'solid thin black' };
  const itemRowStyle: CSS.Properties = { height: '30px' };
  const brandColStyle: CSS.Properties = {
    ...tableBorderStyle,
    minWidth: '115px',
    textAlign: 'center',
  };
  const songColStyle: CSS.Properties = {
    ...tableBorderStyle,
    minWidth: '350px',
  };
  const idolNameColStyle: CSS.Properties = {
    ...tableBorderStyle,
    minWidth: '100px',
  };
  const meikanColStyle: CSS.Properties = {
    ...tableBorderStyle,
    textAlign: 'center',
  };
  return (
    <div>
      <table style={{ border: 'solid thin' }}>
        <tr>
          <th style={tableBorderStyle}>#</th>
          <th style={tableBorderStyle}>ブランド</th>
          <th style={tableBorderStyle}>曲名</th>
        </tr>
        {songs.map((song, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr style={{ ...itemRowStyle, backgroundColor: brandColor(song.brand as Brand) }} key={`table-${idx}-${song.name}`}>
            <td style={tableBorderStyle}>{idx}</td>
            <td style={brandColStyle}>{song.brand}</td>
            <td style={songColStyle}>{song.name}</td>
          </tr>
        ))}
      </table>
      <table style={{ border: 'solid thin' }}>
        <tr>
          <th style={tableBorderStyle}>#</th>
          <th style={tableBorderStyle}>ブランド</th>
          <th style={tableBorderStyle}>名前</th>
          <th style={tableBorderStyle}>アイドル名鑑(Link)</th>
        </tr>
        {idols.map((idol, idx) => {
          const idolNumber = (url: string) => url.split('/').pop() ?? '';
          return (
            // eslint-disable-next-line react/no-array-index-key
            <tr style={{ ...itemRowStyle, backgroundColor: brandColor(idol.brand as Brand) }} key={`table-${idx}-${idol.name}`}>
              <td style={tableBorderStyle}>{idx}</td>
              <td style={brandColStyle}>{idol.brand}</td>
              <td style={idolNameColStyle}>{idol.name}</td>
              <td style={meikanColStyle}>
                <a href={idol.url} target='_blank' rel='noopener noreferrer'>
                  🕮
                  {idolNumber(idol.url)}
                </a>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Result;
