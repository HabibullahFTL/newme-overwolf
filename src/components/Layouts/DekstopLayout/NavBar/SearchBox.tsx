import React from 'react';
import { BsSearch } from 'react-icons/bs';

export const SearchBox = () => {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e);
    }
    return (
        <div className="col-span-3 h-8 my-3">
            <form
                className="w-[296px] h-full bg-dark1 flex flex-wrap rounded"
                action=""
                onSubmit={handleSearch}>
                <input
                    className="bg-transparent w-64 h-full block p-4 outline-none text-gray1 rounded-l placeholder-gray-500"
                    type="text"
                    placeholder="Search..." />
                <button
                    className="bg-gradient-yellow block px-3 w-10 rounded-r"
                    type="submit">
                    <BsSearch />
                </button>
            </form>
        </div>
    );
};