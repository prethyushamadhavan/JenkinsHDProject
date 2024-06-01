pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'prethyusha/my-node-app'
        DOCKER_CONFIG_PATH = 'C:\\ProgramData\\Jenkins\\.jenkins\\.docker'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    // Use Docker config for authentication
                    bat "docker --config ${env.DOCKER_CONFIG_PATH} build -t ${DOCKER_IMAGE}:latest ."
                    bat "docker --config ${env.DOCKER_CONFIG_PATH} push ${DOCKER_IMAGE}:latest"
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    bat 'npm install'
                    bat 'npx cypress run'
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    def scannerHome = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('My SonarQube Server') {
                        bat "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Add your deployment commands here
                    echo 'Deploying...'
                }
            }
        }
        stage('Release') {
            steps {
                script {
                    // Add your release commands here
                    echo 'Releasing...'
                }
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                script {
                    // Add your monitoring and alerting commands here
                    echo 'Monitoring and Alerting...'
                }
            }
        }
    }
}
