import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// const vapidKeys = {
//   publicKey:
//     'BOnglc4RUIhBYJcBZjsundEE0BaWzL3EiScvFAIR1dDTsL3jptWaTBwjLbj0A_4UWDJh0rqlV3t1wTJYHmhhRXU',
//   privateKey: '2zavl_S3lc-AwLMQzPKbOn3WLFu2RcIZzTt_F0E4MkU',
// };
// webpush.setVapidDetails(
//   'mailto:phamqthanh2018@gmail.com',
//   vapidKeys.publicKey,
//   vapidKeys.privateKey,
// );

// const subscriptions: Map<string, webpush.PushSubscription> = new Map();
// const PUT = async (request: Request, s: { params: { nextauth: string[] } }) => {
//   const keys = s.params.nextauth;
//   const key = keys[0]!;
//   const query = Object.fromEntries(
//     Array.from(new URL(request.url).searchParams),
//   );
//   switch (query.provider) {
//     case 'login':
//       if (!query.accessToken) return Response.json({ success: false });
//       const subscription = subscriptions.get(key);
//       subscriptions.delete(key);
//       if (!subscription) return Response.json({ success: false });
//       webpush
//         .sendNotification(
//           subscription,
//           JSON.stringify({
//             title: 'Thông tin đăng nhập',
//             text: '',
//             url: '/',
//             data: query.accessToken,
//           }),
//         )
//         .catch((err) => {});

//       return Response.json({ success: true });
//     case 'sub':
//       subscriptions.set(key, await request.json());
//       return Response.json({ success: true });
//     default:
//       return Response.json({ success: false });
//   }
// };
// export { handler as GET, handler as POST, PUT };

export { handler as GET, handler as POST };
