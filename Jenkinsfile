pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'prethyusha/my-node-app'
        SONAR_PROJECT_KEY = 'my-node-app'
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_LOGIN = credentials('11') // Credential ID for SonarQube token
    }
    stages {
        stage('Build') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKERHUB_PSW', usernameVariable:
