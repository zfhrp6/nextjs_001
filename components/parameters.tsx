import CSS from 'csstype';
import { ChangeEvent } from 'react';
import { Tooltip } from 'react-tooltip';
import { useAtom, useSetAtom } from 'jotai';
import { defaultParametersState, idolsState, parametersState, songsState } from '../const/atoms';
import { Brand, Strategy } from '../types/types';

export const SelectStrategy = (): JSX.Element => {
  const [parameters, setParameters] = useAtom(parametersState);
  const isSelected = (strategy: Strategy) => parameters.strategy === strategy;

  const onChangeStrategy = (ev: ChangeEvent<HTMLInputElement>) => {
    const v = ev.target.value as Strategy;
    setParameters({
      ...parameters,
      strategy: v,
    });
  };

  return (
    <div>
      <fieldset style={{ border: 'none' }}>
        <legend>選択戦略</legend>
        <div data-tip data-for={Strategy.full_flat}>
          <label htmlFor={`${Strategy.full_flat}-strategy`}>
            <input
              type='radio'
              id={`${Strategy.full_flat}-strategy`}
              name='strategy'
              value={Strategy.full_flat}
              checked={isSelected(Strategy.full_flat)}
              onChange={onChangeStrategy}
            />
            {Strategy.full_flat}
          </label>
        </div>
        <Tooltip id={Strategy.full_flat} data-tooltip-place='right' data-tooltip-variant='info'>
          <span>全ての候補の中からランダムに選択します</span>
        </Tooltip>
        <div data-tip data-for={Strategy.brand_flat}>
          <label htmlFor={`${Strategy.brand_flat}-strategy`}>
            <input
              type='radio'
              id={`${Strategy.brand_flat}-strategy`}
              name='strategy'
              value={Strategy.brand_flat}
              checked={isSelected(Strategy.brand_flat)}
              onChange={onChangeStrategy}
            />
            {Strategy.brand_flat}
          </label>
        </div>
        <Tooltip id={Strategy.brand_flat} data-tooltip-place='right' data-tooltip-variant='info'>
          <span>各ブランドを均等に選択します</span>
        </Tooltip>
      </fieldset>
    </div>
  );
};

export const SelectProduction = (brand: Brand, idx: number): JSX.Element => {
  const [parameters, setParameters] = useAtom(parametersState);
  const onChangeBrands = (ev: ChangeEvent<HTMLInputElement>) => {
    const v = ev.target.value as Brand;
    if (parameters.brands?.includes(v)) {
      setParameters({ ...parameters, brands: parameters.brands?.filter((p) => p !== v) });
    } else {
      setParameters({ ...parameters, brands: [...parameters.brands, v] });
    }
  };

  const isSelected = parameters.brands?.includes(brand);

  return (
    <div key={idx}>
      <input type='checkbox' id={brand} name='production' value={brand} checked={isSelected} onChange={onChangeBrands} />
      <label htmlFor={brand}>{brand}</label>
    </div>
  );
};

export const ParameterBox = (): JSX.Element => {
  const [parameters, setParameters] = useAtom(parametersState);
  const isSelectedAll = parameters.brands?.length === Brand.length;
  const toggleAllSelection = () => {
    setParameters({
      ...parameters,
      brands: isSelectedAll ? [] : Brand as unknown as Brand[],
    });
  };
  const parametersStyle: CSS.Properties = { display: 'flex' };

  return (
    <div style={parametersStyle}>
      <div>
        <fieldset style={{ border: 'none' }}>
          <legend>ブランド選択</legend>
          <div>
            <label htmlFor='ALL'>
              <input
                type='checkbox'
                id='ALL'
                name='all-production'
                value='ぜんぶ'
                checked={isSelectedAll}
                onChange={toggleAllSelection}
              />
              ぜんぶ
            </label>
          </div>
          {Brand.map((p, idx) => SelectProduction(p, idx))}
        </fieldset>
      </div>
      <div>
        <SelectStrategy />
      </div>
    </div>
  );
};

export const NumberParameters = (): JSX.Element => {
  const [parameters, setParameters] = useAtom(parametersState);
  const handler = (ev: ChangeEvent<HTMLInputElement>) => {
    try {
      let a = ev.target.valueAsNumber;
      a = Number.isNaN(a) ? parameters.number : a;
      a = a <= 0 ? 0 : a;
      setParameters({ ...parameters, number: a });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <label htmlFor='number'>
        検索数&nbsp;&nbsp;
        <input id='number' type='number' name='number' value={parameters.number} onChange={handler} />
      </label>
    </div>
  );
};

export const AllClear = (): JSX.Element => {
  const setParameters = useSetAtom(parametersState);
  const setSongs = useSetAtom(songsState);
  const setIdols = useSetAtom(idolsState);
  const clear = () => {
    setParameters(defaultParametersState);
    setSongs([]);
    setIdols([]);
  };
  return (
    <button type='button' onClick={clear}>ぜんぶクリア</button>
  );
};
