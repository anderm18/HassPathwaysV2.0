import React, { useEffect, useState, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import ChevronDown from "@/public/assets/svg/chevron-down.svg?svgr";
import ChevronUp from "@/public/assets/svg/chevron-up.svg?svgr";
//import {CourseStates} from "@/app/model/CourseInterface";
import { courseState } from "@/public/data/staticData";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [selectedItem, setSelectedItem] = useState("Not Selected");
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (state: string) => {
        setSelectedItem(state);
        setOpen(false);
    };

    useEffect(() => {
        const outsideDropdown = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("click", outsideDropdown);
        }

        return () => {
            document.removeEventListener("click", outsideDropdown);
        };
    }, [open]);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div ref={dropdownRef}>
                <Menu.Button
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => setOpen(!open)}
                >
                    {selectedItem}
                    {open ? <ChevronUp className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> : <ChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />}
                </Menu.Button>
            </div>

            <Transition
                className="relative z-10"
                as="div"
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                {open && (
                    <Menu.Items
                        className={classNames(
                            "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                        )}
                    >
                        <div className="py-1 relative z-50">
                            {courseState.map((state) => (
                                <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-white text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => handleSelect(state.display)}
                                    >
                                        {state.display}
                                    </a>
                                )}
                            </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                )}
            </Transition>
        </Menu>
    );
}
