import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import MessageContainer from "./chatting/Message_con";
export default function Drawercomp() {
  return (
    <>
      <Drawer classname="w-80 min-h-96">
        <DrawerTrigger>
          <button className="btn btn-success">Success</button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <MessageContainer />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      ;
    </>
  );
}
