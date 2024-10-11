import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  PowerIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { MenuItems } from "../types";
import SignOutButton from "./SignOutButton";
import avatarDefualt from "../../assets/avatar.png";
import Image from "next/image";

interface Props {
  menuItems: MenuItems[];
  avatar?: string;
}

export default function ProfileMenu({ menuItems, avatar }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { isAdmin, profile } = useAuth();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
      <MenuHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          {/* <Avatar
            variant='circular'
            size='sm'
            alt='candice wu'
            className='border border-blue-500 p-0.5'
            src={avatar || (avatarDefualt as any)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          /> */}
          <Image
            width={100}
            height={100}
            src={avatar || (avatarDefualt as any)}
            alt='profile'
            className='w-8 h-8 rounded-full border border-blue-500 p-0.5'
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList
        className='p-1'
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        {menuItems.map(({ href, icon, label }) => {
          return (
            <Link key={href} href={href} className='outline-none'>
              <MenuItem
                onClick={closeMenu}
                className='flex items-center gap-2 rounded'
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}>
                {icon}
                <span>{label}</span>
              </MenuItem>
            </Link>
          );
        })}

        {isAdmin ? (
          <Link href='/dashboard' className='outline-none'>
            <MenuItem
              onClick={closeMenu}
              className='flex items-center gap-2 rounded'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
              <RectangleGroupIcon className='h-4 w-4' />
              <span>Dashboard</span>
            </MenuItem>
          </Link>
        ) : null}

        <MenuItem
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <SignOutButton>
            <p className='flex items-center gap-2 rounded'>
              <PowerIcon className='h-4 w-4' />
              <span>Sign Out</span>
            </p>
          </SignOutButton>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
