import { IdolQuery, SongQuery } from './query';
import { AllClear, NumberParameters, ParameterBox } from './parameters';
import Result from './result';

export const MainPc = (): JSX.Element => (
  <>
    <ParameterBox />
    <NumberParameters />
    <IdolQuery />
    <SongQuery />
    <AllClear />
    <Result />
  </>
);

export const MainSp = (): JSX.Element => (
  <>
    <ParameterBox />
    <NumberParameters />
    <IdolQuery />
    <SongQuery />
    <AllClear />
    <Result />
  </>
);
