import Vector from "@/details/vector1";
import Yellow from "@/details/yellow";
import Details from "@/components/account/AccountDetails";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";

export default function Account({ details, id }) {
  return (
    <div className="w-full h-auto">
      <div className="fixed left-64 bottom-[60vh] z-[-1]">
        <Vector />
      </div>
      <div className="fixed left-[38vw] bottom-[94vh] z-[-1]">
        <Vector />
      </div>
      <div className="fixed left-[105vw] top-[60vh] z-[-1]">
        <Yellow />
      </div>
      <Details id={id} det={details} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  const res = await getDoc(doc(firestore, "Users", id));
  const account = res.data();

  return {
    props: {
      id: id,
      details: account.details,
    },
  };
}
