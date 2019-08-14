import React, { Component } from "react";
import {
	FlatList,
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	AsyncStorage
} from "react-native";
import { Navigation } from "react-native-navigation";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

import { usersQuery } from "./GraphQuery";
import baseURL from "../../helpers/constants";
import logo1 from "../../assets/logo1.png";
import myAvatar from "../../assets/myAvatar.png";
import GithubStorageKey from "../../helpers/constants";

const initializeAppolo = token => {
	const link = new HttpLink({
		uri: baseURL,
		headers: {
			authorization: `Bearer ${token}`
		}
	});
	const cache = new InMemoryCache();
	const client = new ApolloClient({ link, cache });
};

export default class DevsScreen extends Component {
	state = {
		client: null,
		devs: [],
		user: {
			uname: "Vera"
		}
	};

	async componentDidMount() {
		let token = await AsyncStorage.getItem("@Expo:GithubToken");
		console.log(token);
		const client = initializeAppolo(token);
		this.setState({
			client: client
		});
	}

	render() {
		if (!this.state.client) {
			return <Text>Loading...</Text>;
		} else {
			return (
				<ApolloProvider client={this.state.client}>
					<View style={styles.container}>
						<View style={styles.main}>
							{/* <View style={{ flexDirection: "row" }}>
							<Image source={logo1} />
							<View style={{ justifyContent: "space-between" }}>
								<TouchableOpacity onPress={() => this.moveToAddNewCustomer()}>
									<Image style={styles.avatar} source={myAvatar} />
								</TouchableOpacity>
								
								<Text
									style={{
										textAlign: "right",
										marginRight: "25%",
										color: "#2699FB"
									}}
								>
									{" "}
									@{user.uname}
								</Text>
							</View>
						</View> */}
							<Query query={usersQuery}>
								{({ data, error, loading }) => {
									console.log(data);
									if (loading) {
										return <Text>Loading...</Text>;
									}
									if (data.search) {
										return (
											<FlatList
												style={{ marginTop: "17%" }}
												data={data.search.nodes}
												renderItem={({ item }) => (
													<View style={styles.item}>
														<Image
															style={styles.profile}
															source={{
																uri: item.avatarUrl
															}}
														/>
														<View style={styles.namesLocation}>
															<Text style={{ color: "#2699FB" }}>
																{item.name}
															</Text>
															<Text style={{ color: "#2699FB" }}>
																{item.location}
															</Text>
														</View>
													</View>
												)}
											/>
										);
									}
									if (error) {
										return <Text>{error}</Text>;
									}
								}}
							</Query>
						</View>
					</View>
				</ApolloProvider>
			);
		}
	}
}

const styles = StyleSheet.create({
	main: {
		marginTop: "20%"
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: "20%",
		marginLeft: "60%",
		marginTop: "5%",
		textAlign: "right"
	},

	container: {
		flex: 1,
		backgroundColor: "#fcfcfc",
		marginLeft: "5%"
	},
	item: {
		flexDirection: "row",
		backgroundColor: "#F1F9FF",
		paddingBottom: "1%",
		width: "90%",
		borderBottomWidth: 1,
		borderBottomColor: "#2699FB"
	},
	profile: {
		width: 50,
		height: 50,
		borderRadius: 25,
		margin: "5%"
	},
	namesLocation: {
		marginTop: "6%",
		justifyContent: "space-between",
		color: "#2699FB"
	}
});
