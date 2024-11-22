import { create } from 'zustand';
import { persist } from 'zustand/middleware';



interface ICommonStore {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;

}

const useCommonStore = create(
    persist<ICommonStore>(
        (set) => ({
            isOpen: false,
            setIsOpen: (value: boolean) => {
                set({ isOpen: value })
            }

        }),
        {
            name: 'commonStore',
        }
    )
);
export default useCommonStore;