import React from "react";
import { AsyncStorage, StyleSheet, Image, View } from "react-native";
import firebase from "firebase";

import LoginLogo from "./assets/LoginLogo.png";
import GithubButton from "./src/components/gitButton";
import GithubStorageKey from "./helpers/constants";
import getGithubTokenAsync from "./helpers/getGithubTokenAsync";
import ProfileScreen from "./src/screens/Profile";
import DevsScreen from "./src/screens/Devs";
import initializeFirebase from "./utils/githubAuth";

async function attemptToRestoreAuthAsync() {
	let token = await AsyncStorage.getItem("@Expo:GithubToken");
	if (token) {
		return signInAsync(token);
	}
}

export default class App extends React.Component {
	state = {
		isSignedIn: false
	};

	componentDidMount() {
		this.setupFirebaseAsync();
	}

	signInAsync = async token => {
		try {
			const token = await getGithubTokenAsync();
			if (token) {
				await AsyncStorage.setItem("@Expo:GithubToken", token);
				const credential = firebase.auth.GithubAuthProvider.credential(token);

				const firebaseData = firebase
					.auth()
					.signInAndRetrieveDataWithCredential(credential);
				return firebaseData;
			}
		} catch ({ message }) {
			alert(message);
		}
	};

	setupFirebaseAsync = async () => {
		initializeFirebase();

		firebase.auth().onAuthStateChanged(async auth => {
			const isSignedIn = !!auth;
			this.setState({
				isSignedIn
			});
			if (!isSignedIn) {
				attemptToRestoreAuthAsync();
			}
		});
	};

	render() {
		if (!this.state.isSignedIn) {
			return (
				<View style={styles.container}>
					<Image source={LoginLogo} />
					<GithubButton onPress={() => this.signInAsync()} />
				</View>
			);
		} else {
			return <DevsScreen />;
		}
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: "#34495e",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fcfcfc"
	}
});
