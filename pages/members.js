import dynamic from "next/dynamic";

const MembersPage = dynamic(() => import("../components/MembersPage"), {
  ssr: false,
});

export default MembersPage;
