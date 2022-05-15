import channels_graphql_ws
from tictactoe.schema import schema


class GraphqlWSConsumer(channels_graphql_ws.GraphqlWsConsumer):
    """Channels WebSocket consumer which provides GraphQL API."""
    schema = schema
   
    async def on_connect(self, payload):
        """New client connection handler."""
        # You can `raise` from here to reject the connection.
        self.accept('subprotocol')
        print("New client connected!")
