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
import firebase from 'firebase';
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

import { usersQuery } from "./GraphQuery";
import logo1 from "../../assets/logo1.png";
import myAvatar from "../../assets/myAvatar.png";


async function signOutAsync() {
	try {
		await AsyncStorage.clear();
		await firebase.auth().signOut();
	} catch ({ message }) {
		alert("Error: " + message);
	}
}

const initializeAppolo = token => {
	const link = new HttpLink({
		uri: "https://api.github.com/graphql",
		headers: {
			authorization: `Bearer ${token}`
		}
	});
	const cache = new InMemoryCache();
	const client = new ApolloClient({ link, cache });
	return client;
};

export default class DevsScreen extends Component {
	static navigationOptions = { header: null };

	state = {
		client: null,
		devs: [],
		user: {
			uname: "Vera"
		}
	};

	async componentDidMount() {
		let token = await AsyncStorage.getItem("@Expo:GithubToken");
		const client = initializeAppolo(token);
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', client);
		this.setState({
			client: client
		});
	}

	render() {
		if (!this.state.client) {
			return <Text style={{ textAlign: 'center', marginTop: 70}}>Loading...</Text>;
		} else {
			return (
				<ApolloProvider client={this.state.client}>
					<View style={styles.container}>
						<View style={styles.main}>
							<View style={{ flexDirection: "row" }}>
								<Image source={logo1} />
								<View style={{ justifyContent: "space-between" }}>
									<TouchableOpacity onPress={signOutAsync}>
										<Image style={styles.avatar} source={myAvatar} />
									</TouchableOpacity>
									
									<Text
										style={{
											textAlign: "right",
											marginRight: "25%",
											color: "#2699FB"
										}}
										onPress={signOutAsync}
									>
										Logout
									</Text>
								</View>
						</View>
							<Query query={usersQuery}>
								{({ data, error, loading }) => {
									{/* console.log('=======================>', error); */}
									if (loading) {
										return <Text style={{textAlign: 'center'}}>Loading...</Text>;
									}
									if (data) {
										return (
											<FlatList
												style={{ marginTop: "17%" }}
												data={data.search.nodes}
												keyExtractor={(item, index) => index}
												renderItem={({ item }) => (
													<TouchableOpacity
														onPress={() =>
															this.props.navigation.navigate("Profile", {
																item: item
															})
														}
													>
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
																<Text style={{ color: "#2699FB", marginTop: 1 }}>
																	{item.location}
																</Text>
															</View>
														</View>
													</TouchableOpacity>
												)}
											/>
										);
									}
									if (error) {
										return <Text>You might be having a network issue</Text>;
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
		borderRadius: 25,
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
