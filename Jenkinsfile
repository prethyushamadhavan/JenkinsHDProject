pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-node-app'
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_TOKEN = 'squ_fec78446cff9d7006cf3058bb320c20f35aefccb'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/prethyushamadhavan/WebProject.git'
            }
        }
        stage('Verify Docker Setup') {
            steps {
                script {
                    sh 'docker --version'
                    sh 'docker ps'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Run Cypress Tests') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        sh 'npx cypress run'
                    }
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    docker.image('sonarsource/sonar-scanner-cli').inside {
                        withSonarQubeEnv('SonarQube') {
                            sh """
                                sonar-scanner \
                                -Dsonar.projectKey=my-node-app \
                                -Dsonar.sources=. \
                                -Dsonar.host.url=${SONARQUBE_URL} \
                                -Dsonar.login=${SONARQUBE_TOKEN}
                            """
                        }
                    }
                }
            }
        }
        stage('Deploy to Test Environment') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE).run('-d -p 3000:3000')
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            emailext(
                to: "prethyushamadhavan@gmail.com",
                subject: "Jenkins Build Successful: ${env.JOB_NAME} ${env.BUILD_NUMBER}",
                body: """<p>Good news!</p>
                        <p>The Jenkins build for <strong>${env.JOB_NAME} ${env.BUILD_NUMBER}</strong> was successful.</p>
                        <p>Check the details <a href="${env.BUILD_URL}">here</a>.</p>"""
            )
        }
        failure {
            echo 'The pipeline has failed.'
        }
    }
}
