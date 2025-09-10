import Select from '../../components/common/Select';
import type { ProjectsDataType } from '../../server/server';
import { cn } from '../../util/tailwind-merge';
import useFormPage from './hooks/useFormPage';

const FormPage = () => {
  const hooks = useFormPage();
  return (
    <form className={cn(`flex flex-col flex-1 gap-2.5`)}>
      <div className={cn('flex items-center justify-between ')}>
        <h3 className={cn('text-lg font-bold')}>프로젝트 {hooks.id ? '수정' : '생성'}</h3>
        <button
          type="submit"
          className={cn(
            `cursor-pointer min-w-[95px] h-[30px] flex items-center justify-center bg-[#2f68c5] text-white rounded-md font-bold`
          )}
          onClick={hooks.onClickSubmit}
        >
          저장
        </button>
      </div>
      <div className={cn(`overflow-auto bg-white rounded-lg border border-[#DEDEDE]  px-4 py-4 flex-1`)}>
        <div className={cn('grid grid-cols-2 gap-4 ')}>
          {hooks.inputList.map((input) => {
            return (
              <div className={cn(`flex flex-col min-w-[320px]`)} key={input.value}>
                <label
                  key={input.value}
                  htmlFor={input.value}
                  className={cn(`font-bold text-[#333] mb-2 text-sm`, 'flex items-center gap-2')}
                >
                  <span>{input.label}</span>
                  {input.isRequired && <span className={cn(`text-[#e74c3c]`)}>*</span>}
                </label>
                {input.value === 'deptCode' ? (
                  <Select<{ label: string; value: string }>
                    id={input.value}
                    menuList={input.optionList ?? []}
                    selectState={
                      input.value === 'deptCode' ? hooks.selectStateDept : input.optionList && input.optionList[0]
                    }
                    setSelectState={(selected: any) => {
                      hooks.onChangeSelect(selected, input.value);
                    }}
                    defaultValue={input.optionList ? input.optionList[0] : { label: '선택해주세요.', value: '' }}
                    getLabel={(project) => project.label}
                    getValue={(project) => project.value}
                  />
                ) : (
                  <input
                    type={input.type}
                    id={input.value}
                    name={input.value}
                    placeholder={input.placeholder}
                    className={cn(
                      'bg-white border  border-[#e9ecef]',
                      `px-4 py-3 text-sm  rounded-lg `,
                      'focus:outline-none focus:border-[#2F68C5] '
                    )}
                    style={
                      input.type === 'date'
                        ? {
                            colorScheme: 'light',
                          }
                        : undefined
                    }
                    maxLength={input.value === 'year' ? 4 : undefined}
                    value={hooks.formData[input.value as keyof ProjectsDataType] ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => hooks.onChangeInput(e, input.value)}
                    onClick={
                      input.type === 'date'
                        ? (e) => {
                            const input = e.currentTarget as HTMLInputElement;
                            if (typeof input.showPicker === 'function') {
                              input.showPicker();
                            }
                          }
                        : undefined
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default FormPage;
