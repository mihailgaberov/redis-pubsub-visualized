import { useSubscription } from "react-apollo";

export default function useCreateSubscription(subscription: any) {
  const { loading, error, data } = useSubscription(subscription, {
    onSubscriptionData: (data) => console.log(">>> new data", data),
  });

  console.log(">>> data: ", data);
  console.log(">>> loading: ", loading);
  console.log(">>> error: ", error);

  return { data, loading, error };
}
