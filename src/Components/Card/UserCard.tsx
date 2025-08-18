import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { User } from "../../../generated/prisma";
import DeleteUserBtn from "../Buttons/DeleteUserBtn";
import EditUserBtn from "../Buttons/EditUserBtn";

export default function UserCard({ user }: { user: User }) {
  const roleColors: Record<string, string> = {
    admin: "bg-red-100 text-red-700",
    manager: "bg-blue-100 text-blue-700",
    staff: "bg-green-100 text-green-700",
  };

  return (
    <Card
      key={user.id}
      className="hover:shadow-lg transition-all border relative"
    >
      <div className="absolute top-2 right-2 gap-2 flex">
        <EditUserBtn user={user} />
        <DeleteUserBtn user={user}/>
      </div>

      <Flex gap="3" align="center" p="3">
        <Avatar
          size="3"
          src={user.avatar || ""}
          radius="full"
          fallback={user?.name?.charAt(0) || "A"}
        />
        <Box>
          <Text
            as="div"
            size="2"
            weight="bold"
            className="light:text-gray-900 capitalize"
          >
            {user.name}
          </Text>

          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
              roleColors[user.role]
            }`}
          >
            {user.role}
          </span>
        </Box>
      </Flex>
    </Card>
  );
}
