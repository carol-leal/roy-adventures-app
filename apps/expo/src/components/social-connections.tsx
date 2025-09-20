import { Image, Platform, View } from "react-native";
import { useColorScheme } from "nativewind";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { authClient } from "~/utils/auth";

const SOCIAL_CONNECTION_STRATEGIES = [
  // {
  //   type: "oauth_apple",
  //   source: { uri: "https://img.clerk.com/static/apple.png?width=160" },
  //   useTint: true,
  // },
  // {
  //   type: "oauth_google",
  //   source: { uri: "https://img.clerk.com/static/google.png?width=160" },
  //   useTint: false,
  // },
  // {
  //   type: "oauth_github",
  //   source: { uri: "https://img.clerk.com/static/github.png?width=160" },
  //   useTint: true,
  // },
  {
    type: "oauth_discord",
    source: { uri: "https://img.clerk.com/static/discord.png?width=160" },
    useTint: false,
  },
];

export function SocialConnections() {
  const { colorScheme } = useColorScheme();
  const { data: session } = authClient.useSession();

  return (
    <View className="gap-2 sm:flex-row sm:gap-3">
      {SOCIAL_CONNECTION_STRATEGIES.map((strategy) => {
        return (
          <Button
            key={strategy.type}
            variant="outline"
            size="sm"
            className="sm:flex-1"
            onPress={() =>
              session
                ? authClient.signOut()
                : authClient.signIn.social({
                    provider: "discord",
                    callbackURL: "expo://",
                  })
            }
          >
            <Image
              className={cn(
                "size-4",
                strategy.useTint && Platform.select({ web: "dark:invert" }),
              )}
              tintColor={Platform.select({
                native: strategy.useTint
                  ? colorScheme === "dark"
                    ? "white"
                    : "black"
                  : undefined,
              })}
              source={strategy.source}
            />
          </Button>
        );
      })}
    </View>
  );
}
