build-android:
	ionic build --prod --release
	npx jetifier
	npx cap update android
	npx cap sync android
	npx cap open android
build-ios:
	ionic build --prod --release
	npx cap update ios
	npx cap sync ios
	npx cap open ios
