import React, { Component } from "react";
import {
	AsyncStorage,
	StyleSheet,
	Image,
	Button,
	View,
	Text,
	Platform,
} from "react-native";
import firebase from "firebase";
import Icon from "react-native-vector-icons/Ionicons";

import logo1 from "../../assets/logo1.png";

async function signOutAsync() {
	try {
		await AsyncStorage.clear();
		await firebase.auth().signOut();
	} catch ({ message }) {
		alert("Error: " + message);
	}
}
export default class ProfileScreen extends Component {
	state = {
		user: {
			uname: "Vera",
			location: "Kigali - Rwanda"
		}
	};

	render() {
		const user = firebase.auth().currentUser || {};
		const { uname, location } = this.state.user;
		return (
			<View style={styles.container}>
				<View style={styles.main}>
					<View>
						<Image source={logo1} />
					</View>

					<View style={{ display: "flex", flexDirection: "collumn-reverse" }}>
						<Image
							source={{
								uri: user.photoURL
							}}
							style={styles.avatar}
						/>
						<Text
							style={{
								textAlign: "center",
								fontWeight: "bold",
								color: "#2699FB"
							}}
						>
							{" "}
							@{uname}
						</Text>
						<Text style={{ textAlign: "center", color: "#2699FB" }}>
							{location}
						</Text>
						<View style={[styles.link, { position: "relative" }]}>
							<Icon
								name={Platform.OS === "ios" ? "ios-link" : "md-link"}
								style={{
									fontWeight: "bold",
									color: "#2699FB",
									marginRight: "2%"
								}}
								color="#ccc"
								size={17}
							/>
							<Text style={{ color: "#2699FB", fontWeight: "bold" }}>
								Repo Link
							</Text>
						</View>
						<View style={{ flexDirection: "row"}}>
							<View style={styles.aboutDev}>
								<Text>First</Text>
							</View>
							<View style={styles.aboutDev}>
								<Text>Second</Text>
							</View>
							<View style={styles.aboutDev}>
								<Text>Third</Text>
							</View>
						</View>

						{/* <Text style={styles.paragraph}>
							Welcome {user.displayName || user.username || user.email}
						</Text> */}
						<Button
							title="Go Devs"
							onPress={() => this.props.navigation.navigate("Devs")}
							style={{
								marginTop: 90,
								backgroundColor: "red",
							}}
						/>
						<Text style={styles.paragraph} onPress={signOutAsync}>
							Logout
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fcfcfc",
		marginLeft: "5%"
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "#34495e"
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: "20%",
		marginLeft: "45%",
		marginBottom: "2%"
	},
	main: {
		marginTop: "15%"
	},
	aboutDev: {
		width: "30%",
		color: "#2699FB",
		backgroundColor: "#f1f9ff",
		height: 80,
		marginRight: "5%",
		pasition: "relative",
		
	},
	link: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		marginTop: "10%"
	}
});
